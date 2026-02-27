const { I } = inject();

class TestStack {

    /**
     * Авторизовывается в аккаунт
     */
    authLK() {
        I.amOnPage( 'https://demo.app.stack-it.ru/fl/' );
        I.fillField( '//*[text()="Логин"]', 'testuser' );
        I.fillField( '//*[text()="Пароль"]', 'testpass' );
        I.click( '//*[contains(text(),"Войти")]' );
        I.waitForElement( '//*[text()="Адресный фонд"]' );
        I.waitForVisible( '//*[text()="Адресный фонд"]' );
        I.see( 'Адресный фонд', '//*[text()="Адресный фонд"]' );
    }

    /**
     * Проверяет диалогое окно для добавления уровня "Район"
     * @param {string} level - уровень
     */
    checkWindow( level ) {
        I.waitForElement( '//* [contains(text(),"Адреса проживающих")]' );
        I.waitForVisible( '//* [contains(text(),"Адреса проживающих")]' );
        I.click( '//* [contains(text(),"Адреса проживающих")]' );
        I.waitForElement( '//*[@title="Добавить запись"]' ); 
        I.click( '//*[@title="Добавить запись"]' );
        I.seeElement( '.dropdown-menu' ); 
        I.click( `//*[text()="${level}"]` );
        I.seeElement( '.modal-dialog' ); 
        I.see( 'Район (создание)' ); 
        I.seeElement( 'input[name="name"]' );    
    }

    /**
     * Добавляет уровень "Район" в таблицу
     * @param {string} levelNote - название записи
     */
    addLevelInTAble( levelNote ) {
        I.fillField( '//input[@id="VInput2374"]', levelNote );
        I.click( '//span[contains(text(),"Внести")]' );
        I.waitForText( levelNote, 10, '.table' );
        I.see( levelNote );
    }

    /**
     * Изменяет запись в Таблице
     * @param {string} newLevelNote - новое название записи
     */
    updateLevelInTable( newLevelNote ) {
        I.click( '//button[@class="edit"]' );
        I.waitForText( 'Район (редактирование)' );
        I.fillField( '//input[@id="VInput2374"]', newLevelNote );
        I.click( '//span[contains(text(),"Внести")]' );
        I.waitForText( newLevelNote, 10, '.table' );
        I.see( newLevelNote );
    }

    /**
     * Удаляет запись уровня "Район"
     * @param {string} deleteLevelNote - имя удаляемой записи
     */
    deleteNoteInTable( deleteLevelNote ) {
        I.click( '//div[class="v-input--selection-controls__ripple"' );
        I.waitForVisible( '//button[@class="delete"]' );
        I.click( '//button[@class="delete"]' );
        I.acceptPopup();
        I.dontSee( deleteLevelNote );
    }

}
module.exports = TestStack;