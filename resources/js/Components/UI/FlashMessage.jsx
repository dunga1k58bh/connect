const { createRoot } = require("react-dom/client")
import FlashMessage from 'react-flash-message'

UI.FlashMessage = (message, color, duration) => {

    const Message = () => (
        <FlashMessage duration={5000}>
          <strong>{message}</strong>
        </FlashMessage>
    )

    const root = createRoot(document.getElementById("flash-message"));
    root.render(Message);
}
