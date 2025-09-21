import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { Languages } from "lucide-react"

export const LanguageToggle = () => {
    const { i18n } = useTranslation()

    const toggleLanguage = () => {
        const newLang = i18n.language === "ru" ? "en" : "ru"
        i18n.changeLanguage(newLang)
    }

    return (
        <Button variant="outline" size="sm" onClick={toggleLanguage}>
            <Languages className="h-4 w-4" />
            {i18n.language === "ru" ? "RU" : "EN"}
        </Button>
    )
}