import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
export const TranslateContext = createContext();
const TranslateContextProvider = ({ children }) => {
    const [translates, setTranslates] = useState([]);
    const [language, setLanguage] = useState("en");

    const defaultLanguage = async () => {
        const response = await axios.post("/local", {
            lang: "en",
        });
        setTranslates(await response.data);
        console.log(translates);
    };
    const changeLanguage = async (e) => {
        const language = e.target.dataset.lang;
        const response = await axios.post("/local", {
            lang: language,
        });
        setLanguage(language);
        setTranslates(await response.data);
        console.log(translates);
    };

    useEffect(() => {
        defaultLanguage();
    }, []);
    return (
        <TranslateContext.Provider
            value={{ translates, changeLanguage, language }}
        >
            {children}
        </TranslateContext.Provider>
    );
};
export default TranslateContextProvider;
export const useTranslateContext = () => {
    return useContext(TranslateContext);
};
