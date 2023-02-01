const asideList = [
    {
        href: '#',
        title: 'Подсистемы',
    },
    {
        href: '#',
        title: 'Справочники',
    },
    {
        href: '#',
        title: 'Константы',
    },
    {
        href: '#',
        title: 'Документы',
    },
    {
        href: '#',
        title: 'Обработки',
    },
    {
        href: '#',
        title: 'Регистры',
    },
    {
        href: '#',
        title: 'Модули',
    },
    {
        href: '#',
        title: 'Отчеты',
    },
    {
        href: '#',
        title: 'Роли',
    },
]

const columnLeft = document.querySelector('.columnLeft')

columnLeft.innerHTML = asideList.map(link => (
    `<li class="nav-item"><a class="nav-link btn" href="${link.href}">${link.title}</a></li>`
)).join('')