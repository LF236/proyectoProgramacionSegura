export const authHeader = () => {
    const token = localStorage.getItem( 'userInfo' );
    if( token ) {
        return { 'x-access-token': token };
    } else {
        return {};
    }
}