export const nfcRandom = () => {
    let res = '';
    const len = 5;
    for( let i = 0; i < len; i++ ) {
        let aux = parseInt( Math.random() * 10 );
        res += `${ aux }`;
    }
    return res;
}