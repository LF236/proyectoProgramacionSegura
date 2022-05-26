export const formatDate = fecha => {
    const date = new Date( fecha );
    return date.toLocaleDateString();
}