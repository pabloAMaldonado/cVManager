
import notification from "./notiManager"

export const initInfo = <T extends object>(): Array<T> => {
    const cvs = localStorage.getItem('cvs');
    try {
        return cvs ? (JSON.parse(cvs) as Array<T>) : [];
    } catch (error) {
        console.error('Failed to parse localStorage data:', error);
        return [];
    }
}

export const saveInfo = <T extends object>(array: Array<T>) => {
    localStorage.setItem('cvs', JSON.stringify(array))
    notification('Information saved succefully')
}
