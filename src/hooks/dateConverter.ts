
const dateConverter = (dateString: string) => {
    console.log(dateString)

    if (dateString === '' || dateString === 'NaN-NaN-NaN') return ''
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const dateReverter = (dateString: string) => {
    console.log(dateString)
    if (dateString === '' || dateString === 'NaN/NaN/NaN') return ''
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}

export { dateConverter, dateReverter };
