export default function Greeting() {
    const hour = new Date().getHours();

    let message = '';
    let color = '';

    if (hour < 12) {
        message = 'Доброе утро!';
        color = 'yellow';
    } else if (hour < 18) {
        message = 'Добрый день!';
        color = 'green';
    } else {
        message = 'Добрый вечер!'
        color = 'blue';
    }
    
    return (
        <h1 style={{ color }}>
            {message}
        </h1>
    )
}