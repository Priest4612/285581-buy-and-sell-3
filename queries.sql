-- Получить список всех категорий (идентификатор, наименование категории);
SELECT * FROM categories;


-- Получить список категорий для которых создано минимум одно объявление (идентификатор, наименование категории);
SELECT
  categories.id_category AS "идентификатор",
  categories.name AS "наименование категории"
FROM categories
  INNER JOIN offer_to_categories
  ON categories.id_category = offer_to_categories.category_id
GROUP BY
  categories.id_category,
  categories.name
HAVING
  COUNT (offer_to_categories.category_id) > 0
ORDER BY categories.id_category;


-- Получить список категорий с количеством объявлений (идентификатор, наименование категории, количество объявлений в категории);
SELECT
  categories.id_category AS "идентификатор",
  categories.name AS "наименование категории",
  COUNT (offer_to_categories.category_id) AS "количество объявлений в категории"
FROM categories
  INNER JOIN offer_to_categories
  ON categories.id_category = offer_to_categories.category_id
GROUP BY
  categories.id_category,
  categories.name
HAVING
  COUNT (offer_to_categories.category_id) > 0
ORDER BY categories.id_category;


-- Получить список объявлений (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие объявления;
SELECT
  offers.id_offer AS "идентификатор объявления",
  offers.title AS "заголовок объявления",
  offers.sum AS "стоимость",
  offer_types.name AS "тип объявления",
  offers.description AS "текст объявления",
  offers.create_date AS "дата публикации",
  concat(users.firstname, ' ', users.lastname) AS "имя и фамилия автора",
  users.email AS "контактный email",
  (SELECT COUNT(*) FROM comments WHERE offers.id_offer = comments.offer_id) AS "количество комментариев",
  STRING_AGG(categories.name, ', ') AS "наименование категорий"
FROM offer_to_categories
  LEFT JOIN offers
    ON offers.id_offer = offer_to_categories.offer_id
  LEFT JOIN categories
    ON categories.id_category = offer_to_categories.category_id
  INNER JOIN offer_types
    ON offers.type_id = offer_types.id_type
  INNER JOIN users
    ON users.id_user = offers.user_id
GROUP BY
  offers.id_offer,
  offers.title,
  offers.sum,
  offer_types.name,
  offers.description,
  offers.create_date,
  users.firstname,
  users.lastname,
  users.email
ORDER BY
  offers.create_date DESC;


-- Получить полную информацию определённого объявления (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
SELECT
  offers.id_offer AS "идентификатор объявления",
  offers.title AS "заголовок объявления",
  offers.sum AS "стоимость",
  offer_types.name AS "тип объявления",
  offers.description AS "текст объявления",
  offers.create_date AS "дата публикации",
  concat(users.firstname, ' ', users.lastname) AS "имя и фамилия автора",
  users.email AS "контактный email",
  (SELECT COUNT(*) FROM comments WHERE offers.id_offer = comments.offer_id) AS "количество комментариев",
  STRING_AGG(categories.name, ', ') AS "наименование категорий"
FROM offer_to_categories
  LEFT JOIN offers
    ON offers.id_offer = offer_to_categories.offer_id AND offers.id_offer = 5
  LEFT JOIN categories
    ON categories.id_category = offer_to_categories.category_id
  INNER JOIN offer_types
    ON offers.type_id = offer_types.id_type
  INNER JOIN users
    ON users.id_user = offers.user_id
GROUP BY
  offers.id_offer,
  offers.title,
  offers.sum,
  offer_types.name,
  offers.description,
  offers.create_date,
  users.firstname,
  users.lastname,
  users.email
ORDER BY
  offers.create_date DESC;


-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);
SELECT
  comments.id_comment AS "идентификатор комментария",
  comments.offer_id AS "идентификатор объявления",
  concat(users.firstname, ' ', users.lastname) AS "имя и фамилия автора",
  comments.comment AS "текст комментария"
FROM comments
  INNER JOIN users
    ON users.id_user = comments.user_id
ORDER BY
  comments.id_comment DESC
LIMIT 5;


-- Получить список комментариев для определённого объявления (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT
  comments.id_comment AS "идентификатор комментария",
  comments.offer_id AS "идентификатор объявления",
  concat(users.firstname, ' ', users.lastname) AS "имя и фамилия автора",
  comments.comment AS "текст комментария"
FROM comments
  INNER JOIN users
    ON users.id_user = comments.user_id
WHERE comments.offer_id = 3
ORDER BY
  comments.id_comment DESC;


-- Выбрать 2 объявления, соответствующих типу «куплю»;
SELECT *
FROM
  offers
WHERE
  offers.type_id = (SELECT id_type FROM offer_types WHERE name = 'sale')
LIMIT 2;


-- Обновить заголовок определённого объявления на «Уникальное предложение!»;
UPDATE offers
  SET title = 'Уникальное предложение!'
WHERE
  offers.id_offer = 2;
