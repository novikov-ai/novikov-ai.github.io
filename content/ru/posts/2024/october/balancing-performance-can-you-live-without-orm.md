---
title: Балансируя с производительностью. Можно ли жить без ORM?  
slug: balancing-performance-can-you-live-without-orm                 
date: 2024-10-13T11:05:37+03:00
draft: false                                 
params:
  author: Александр Новиков                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [go, sql, dev]         
weight: 10
layout: custom-layout
---

Многие, переходя на Go, начинают искать простой и удобный способ по работе с базой данных. Разработчики так привыкли, и это нормально. 

Когда я писал на C#, то использовал [Entity Framework Core](https://github.com/dotnet/efcore) - ORM для платформы .NET. А так как это был мой первый язык, то мне казалось это вполне естественным и об альтернативах я вообще не задумывался (возможно, на .NET тогда их и не было, не знаю есть ли сейчас). 

В Go есть стандартная библиотека database/sql, представляющая собой общий интерфейс для работы с SQL-подобными базами. Если нужна максимальная производительность, то это ваш выбор.

Но на больших и серьезных проектах на первый план выходит возможность поддержки большой кодовой базы, а это в первую очередь - удобство использования и поддержки. 

### SQLX

Когда стандартного инструмента уже недостаточно, на помощь приходит [sqlx](https://github.com/jmoiron/sqlx), расширяя возможности, при сохранении производительности.

В прошлом месяце перед нашей командой стоял вопрос о том, как удобнее работать с базой, так как в прошлом немного настрадались с голым sqlx. Решили серьезно рассмотреть использование ORM, которых в языке хватает. 

Когда только начал изучать Go, одно из первых, что запомнил - ORM для языка очень плохая практика. С этой мыслью и жил, пока вопрос удобства не встал более острым, чем вопрос производительности. 

Подискутировав с командой и не найдя единого решения, я дошел до внутреннего Go-коммьюнити за советом. Коллеги единогласно разгромили ORM, и мы обсудили альтернативы 🤓

Из интересного мне приглянулась библиотека по генерации SQL-запросов - squirrel. И я решил сразу ее попробовать в бою.

На удивление, задача подвернулась очень быстро. Потребовалось сохранять в таблицу множество элементов за раз, так как множественные инсерты - это роскошь, которую мы позволить в нагруженном проекте никак не можем. 

Задача кажется понятной, но был один нюанс. Количество сохраняемых элементов могло варьироваться в довольно большом диапазоне, а это значит, что нужно было писать "костыль", который составлял бы довольно громоздкий запрос. 

### Составляем sql-запросы

Тут и пригодился [squirrel](https://github.com/Masterminds/squirrel), который при помощи различных билдеров мог составлять сложные запросы.

Инициируем такой билдер, наполняя данными. 

**Важно** не забыть выбрать плейсхолдер для переменных в зависимости от драйвера бд! Для Постгреса это доллар. 

~~~go
builder := squirrel.Insert("element").Columns("title", "price")

 for _, element := range elements {
  builder = builder.Values(
   element.Title, element.Price)
 }

query, args, err := builder.PlaceholderFormat(squirrel.Dollar).ToSql()
 if err != nil {
  return fmt.Errorf("failed to build query: %w", err)
 }

 _, err = tx.Exec(query, args...)
 if err != nil {
  return fmt.Errorf("failed to execute query: %w", err)
 }
 ~~~

По итогу получаем нужный запрос:

~~~sql
INSERT INTO element (title, price) VALUES ($1, $2), ($3, $4)
~~~

Конечно, интересно еще посмотреть на различные тесты производительности кода с этой либой и без (возможно, сделаю в будущем бенчмарки), но пока выглядит отличным инструментом, когда вы переросли sqlx, а в полноценную ORM идти пока не хотите.

*Читайте оригинальный пост и присоединяйтесь к обсуждению в Телеграм: [@time2code](https://t.me/time2code/307)*