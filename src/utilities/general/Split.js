export const Split = (txt, len) => {
    if (txt) {
        if (txt.length < len) {
            return txt
        } else {
            return `${txt.slice(0, len)}...`
        }
    } else {
        return "";
    }
}
