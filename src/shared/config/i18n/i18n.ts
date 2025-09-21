import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
    lng: "ru",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                searchPlaceholder: "Search by ID, customer, or city...",
                searchPlaceholderByName: "Search by name or email...",
                orders: {
                    title: "Orders"
                },
                directory: {
                    title: "Сustomer directory",
                    columns: {
                        Name: "Name",
                        Email: "Email",
                        City: "City",
                        city: "Город",
                        LTV: "LTV",
                        Orders: "Orders"
                    },
                },
                loading: "Loading...",
                error: "Failed to load data",
                columns: {
                    id: "ID",
                    date: "Date",
                    customerId: "Customer",
                    city: "City",
                    channel: "Channel",
                    status: "Status",
                    total: "Total",
                },
                statuses: {
                    New: "New",
                    Processing: "Processing",
                    Shipped: "Shipped",
                },
            },
        },
        ru: {
            translation: {
                searchPlaceholder: "Поиск по ID, клиенту или городу...",
                searchPlaceholderByName: "Поиск по имени или почте...",
                orders: {
                    title: "Заказы"
                },
                directory: {
                    title: "Справочник клиентов",
                    columns: {
                        Name: "Имя",
                        Email: "Электронная почта",
                        City: "Город",
                        LTV: "LTV",
                        Orders: "Заказы"
                    },
                },
                loading: "Загрузка...",
                error: "Ошибка загрузки",
                columns: {
                    id: "ID",
                    date: "Дата",
                    customerId: "Клиент",
                    city: "Город",
                    channel: "Канал",
                    status: "Статус",
                    total: "Сумма",
                },
                statuses: {
                    New: "Новый",
                    Processing: "В обработке",
                    Shipped: "Отгружен",
                },
            },
        },
    },
})

export default i18n