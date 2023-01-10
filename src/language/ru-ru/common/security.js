
var security = {
    // Heading
    $_heading_title    : 'Важное сообщение безопасности!',

    // Text
    $_text_success     : 'Хранилище storage успешно изменено!',
    $_text_admin       : 'Откройте файл admin/config.php и измените его',
    $_text_security    : 'Внимание! Это важно. Для большей безопасности вы должны переместить директорию хранилища storage за пределы корневой директории сайта <br/> (например в public_html, www или htdocs).',
    $_text_choose      : 'Выберите как вы хотите перенести директорию storage',
    $_text_automatic   : 'Автоматическое перемещение',
    $_text_manual      : 'Самостоятельное перемещение',
    $_text_move        : 'Переместить',
    $_text_to          : 'в',
    $_text_config      : 'Откройте файл config.php и измените его',
    $_text_admin       : 'Откройте файл admin/config.php и измените его',

    // Button
    $_button_move      : 'Переместить',
    $_button_manual    : 'Самостоятельно',

    // Error
    $_error_permission : 'Внимание: У Вас нет прав для изменения директории хранилища!',
    $_error_path       : 'Внимание: Некорректный путь!',
    $_error_directory  : 'Внимание: Некорректная директория!',
    $_error_exists     : 'Внимание: Директория уже существует!',
    $_error_writable   : 'Внимание: для config.php и admin/config.php необходимы права записи!'
}

module.exports =   { security }