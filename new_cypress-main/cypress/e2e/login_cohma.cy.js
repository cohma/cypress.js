import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {

	beforeEach('Начало теста', function () {
		cy.visit('/'); // зашли на сайт
		cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
		  }); // проверяю цвет кнопки

	afterEach('Конец теста', function () {
		cy.get('#exitMessageButton > .exitIcon').should('be.visible');
		  }); // есть крестик и он виден пользователю

	it('Верный логин и верный пароль', function () {
		cy.get('#mail').type(data.login); // ввели верный логин
		cy.get('#pass').type(data.password); // ввели верный пароль
		cy.get('#loginButton').click(); // нажали "войти"
		cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверили, что после авт-ии видим текст
		cy.get('#messageHeader').should('be.visible'); // текст виден пользователю

	})

	it('Проверка восстановления пароля', function () {
		cy.get('#forgotEmailButton').click(); // нажали "забыли пароль"
		cy.get('#mailForgot').type(data.login); // ввели почту для восстановления
		cy.get('#restoreEmailButton').click(); // нажали "отправить код"
		cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // проверили, что текст совпадает
		cy.get('#messageHeader').should('be.visible'); // текст виден пользователю

	})

	it('Верный логин и неверный пароль', function () {
		cy.get('#mail').type(data.login); // ввели верный логин
		cy.get('#pass').type('iLoveqastudio9'); // ввели неверный пароль
		cy.get('#loginButton').click(); // нажали "войти"
		cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверили, что после авт-ии видим текст
		cy.get('#messageHeader').should('be.visible'); // текст виден пользователю

	})

	it('Неверный логин и верный пароль', function () {
		cy.get('#mail').type('germman@dolnikov.ru'); // ввели неверный логин
		cy.get('#pass').type(data.password); // ввели верный пароль
		cy.get('#loginButton').click(); // нажали "войти"
		cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверили, что после авт-ии видим текст
		cy.get('#messageHeader').should('be.visible'); // текст виден пользователю

	})

	it('Проверка валидации, логин без @', function () {
		cy.get('#mail').type('germmandolnikov.ru'); // ввели логин без @
		cy.get('#pass').type(data.password); // ввели верный пароль
		cy.get('#loginButton').click(); // нажали "войти"
		cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // проверили, что после авт-ии видим текст
		cy.get('#messageHeader').should('be.visible'); // текст виден пользователю

	})

	it('Проверка на приведение к строчным буквам', function () {
		cy.get('#mail').type('GerMan@Dolnikov.ru'); // ввели логин GerMan@Dolnikov.ru
		cy.get('#pass').type(data.password); // ввели верный пароль
		cy.get('#loginButton').click(); // нажали "войти"
		cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверили, что после авт-ии видим текст
		cy.get('#messageHeader').should('be.visible'); // текст виден пользователю

	})
})

 // запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
 