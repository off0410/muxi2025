CREATE TABLE book (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

CREATE TABLE storage (
    id INT PRIMARY KEY AUTO_INCREMENT,
    book_id VARCHAR(36) NOT NULL,
    stock INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES book(id)
);

CREATE TABLE person (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE book_person_relation (
    person_id INT NOT NULL,
    book_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (person_id, book_id),
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (book_id) REFERENCES book(id)
);

INSERT INTO book (id, title, author) VALUES
('go-away', 'the way to go', 'Ivo'),
('go-lang', 'Go语言圣经', 'Alan, Brian'),
('go-web', 'Go Web编程', 'Anonymous'),
('con-cur', 'Concurrency in Go', 'Katherine');

INSERT INTO storage (book_id, stock) VALUES
('go-away', 20),
('go-lang', 17),
('go-web', 4),
('con-cur', 9);

INSERT INTO person (name) VALUES
('小明'),
('张三'),
('翟曙');

INSERT INTO book_person_relation (person_id, book_id) VALUES
-- 小明喜欢的书
(1, 'go-away'),
(1, 'go-web'),
(1, 'con-cur'),
-- 张三喜欢的书
(2, 'go-away'),
-- 翟曙喜欢的书
(3, 'go-web'),
(3, 'con-cur');

SELECT p.name
FROM person p
INNER JOIN book_person_relation bpr ON p.id = bpr.person_id
INNER JOIN book b ON bpr.book_id = b.id
WHERE b.id = 'go-web';

SELECT b.id, b.author, b.title, s.stock
FROM book b
LEFT JOIN book_person_relation bpr ON b.id = bpr.book_id
LEFT JOIN storage s ON b.id = s.book_id
WHERE bpr.person_id IS NULL;

SELECT p.name, b.title
FROM person p
INNER JOIN book_person_relation bpr ON p.id = bpr.person_id
INNER JOIN book b ON bpr.book_id = b.id;