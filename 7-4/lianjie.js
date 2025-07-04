// 图书管理系统前端JavaScript代码

// DOM元素
const baseUrl = 'http://localhost:8080';

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    createBookListSection();
    createAddBookSection();
    createBookDetailSection();
    createUpdateBookSection();
    createDeleteBookSection();
});

// 创建图书列表区域
function createBookListSection() {
    const container = document.createElement('div');
    container.innerHTML = `
        <h2>图书列表</h2>
        <button id="getBooksButton">获取图书列表</button>
        <ul id="bookList"></ul>
    `;
    document.body.appendChild(container);

    // 添加事件监听器
    document.getElementById('getBooksButton').addEventListener('click', async () => {
        try {
            const books = await fetchBooks();
            renderBookList(books);
        } catch (error) {
            showError('获取图书列表失败:', error);
        }
    });
}

// 创建添加图书区域
function createAddBookSection() {
    const container = document.createElement('div');
    container.innerHTML = `
        <h2>添加新书</h2>
        <div>
            <label>图书ID:</label>
            <input type="text" id="newBookId" placeholder="图书ID">
        </div>
        <div>
            <label>图书标题:</label>
            <input type="text" id="newBookTitle" placeholder="图书标题">
        </div>
        <div>
            <label>图书作者:</label>
            <input type="text" id="newBookAuthor" placeholder="图书作者">
        </div>
        <div>
            <label>图书库存:</label>
            <input type="number" id="newBookStock" placeholder="图书库存">
        </div>
        <button id="addBookButton">添加新书</button>
        <div id="addBookResult"></div>
    `;
    document.body.appendChild(container);

    // 添加事件监听器
    document.getElementById('addBookButton').addEventListener('click', async () => {
        try {
            const newBook = {
                id: document.getElementById('newBookId').value,
                title: document.getElementById('newBookTitle').value,
                author: document.getElementById('newBookAuthor').value,
                stock: parseInt(document.getElementById('newBookStock').value)
            };

            const result = await addBook(newBook);
            document.getElementById('addBookResult').textContent = `添加结果: ${JSON.stringify(result)}`;
        } catch (error) {
            showError('添加新书失败:', error);
        }
    });
}

// 创建图书详情区域
function createBookDetailSection() {
    const container = document.createElement('div');
    container.innerHTML = `
        <h2>图书详情</h2>
        <div>
            <label>图书ID:</label>
            <input type="text" id="bookIdForDetail" placeholder="图书ID">
            <button id="getBookDetailButton">获取图书详情</button>
        </div>
        <div id="bookDetail"></div>
    `;
    document.body.appendChild(container);

    // 添加事件监听器
    document.getElementById('getBookDetailButton').addEventListener('click', async () => {
        try {
            const bookId = document.getElementById('bookIdForDetail').value;
            const book = await getBookDetail(bookId);
            renderBookDetail(book);
        } catch (error) {
            showError('获取图书详情失败:', error);
        }
    });
}

// 创建更新图书区域
function createUpdateBookSection() {
    const container = document.createElement('div');
    container.innerHTML = `
        <h2>更新图书信息</h2>
        <div>
            <label>图书ID:</label>
            <input type="text" id="bookIdForUpdate" placeholder="图书ID">
        </div>
        <div>
            <label>图书标题:</label>
            <input type="text" id="updatedBookTitle" placeholder="更新后的图书标题">
        </div>
        <div>
            <label>图书作者:</label>
            <input type="text" id="updatedBookAuthor" placeholder="更新后的图书作者">
        </div>
        <div>
            <label>图书库存:</label>
            <input type="number" id="updatedBookStock" placeholder="更新后的图书库存">
        </div>
        <button id="updateBookButton">更新图书信息</button>
        <div id="updateBookResult"></div>
    `;
    document.body.appendChild(container);

    // 添加事件监听器
    document.getElementById('updateBookButton').addEventListener('click', async () => {
        try {
            const bookId = document.getElementById('bookIdForUpdate').value;
            const updatedBook = {
                title: document.getElementById('updatedBookTitle').value,
                author: document.getElementById('updatedBookAuthor').value,
                stock: parseInt(document.getElementById('updatedBookStock').value)
            };

            const result = await updateBook(bookId, updatedBook);
            document.getElementById('updateBookResult').textContent = `更新结果: ${JSON.stringify(result)}`;
        } catch (error) {
            showError('更新图书信息失败:', error);
        }
    });
}

// 创建删除图书区域
function createDeleteBookSection() {
    const container = document.createElement('div');
    container.innerHTML = `
        <h2>删除图书</h2>
        <div>
            <label>图书ID:</label>
            <input type="text" id="bookIdForDelete" placeholder="图书ID">
            <button id="deleteBookButton">删除图书</button>
        </div>
        <div id="deleteBookResult"></div>
    `;
    document.body.appendChild(container);

    // 添加事件监听器
    document.getElementById('deleteBookButton').addEventListener('click', async () => {
        try {
            const bookId = document.getElementById('bookIdForDelete').value;
            const result = await deleteBook(bookId);
            document.getElementById('deleteBookResult').textContent = `删除结果: ${JSON.stringify(result)}`;
        } catch (error) {
            showError('删除图书失败:', error);
        }
    });
}

// API调用函数
async function fetchBooks() {
    const response = await fetch(`${baseUrl}/books`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function addBook(book) {
    const response = await fetch(`${baseUrl}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function getBookDetail(bookId) {
    const response = await fetch(`${baseUrl}/books/${bookId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function updateBook(bookId, updatedBook) {
    const response = await fetch(`${baseUrl}/books/${bookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBook)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function deleteBook(bookId) {
    const response = await fetch(`${baseUrl}/books/${bookId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// 渲染函数
function renderBookList(books) {
    const bookListElement = document.getElementById('bookList');
    bookListElement.innerHTML = '';

    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} - ${book.author} (库存: ${book.stock})`;
        bookListElement.appendChild(li);
    });
}

function renderBookDetail(book) {
    const bookDetailElement = document.getElementById('bookDetail');
    bookDetailElement.innerHTML = `
        <div>标题: ${book.title}</div>
        <div>作者: ${book.author}</div>
        <div>库存: ${book.stock}</div>
        <div>ID: ${book.id}</div>
    `;
}

// 错误处理函数
function showError(message, error) {
    console.error(message, error);
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = `${message} ${error.message}`;
    document.body.appendChild(errorElement);


    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}