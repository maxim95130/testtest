const testStack = require( '../..//testStack' );

Feature( 'Тестирование формы авторизации и операций с адресным фондом' );

Scenario( '1. Успешный логин', async() => {
    testStack.authLK();
} );

Scenario( '2. Проверка диалогового окна для добавления уровня "Район"', async() => {
    testStack.authLK();
    testStack.checkWindow( 'Район' );
} );

Scenario( '3. Добавление уровня "Район" в таблицу', async() => {
    testStack.authLK();
    testStack.checkWindow( 'Район' );
    testStack.addLevelInTAble( 'TestLevel' );
} );

Scenario( '4. Редактирование записи уровня "Район"', async() => {
    testStack.authLK();
    testStack.checkWindow( 'Район' );
    testStack.addLevelInTAble( 'TestLevel' );
    testStack.updateLevelInTable( 'TestLevel123' );
} );

Scenario( '5. Удаление записи уровня "Район"', async() => {
    testStack.authLK();
    testStack.checkWindow( 'Район' );
    testStack.deleteNoteInTable();
} );