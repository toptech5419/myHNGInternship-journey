# ChatTextGenius

Welcome to **ChatTextGenius**, a React-based chat application that allows users to send messages, translate them into multiple languages, and summarize long texts using advanced natural language processing. This project integrates with a Node.js/Express backend for server-side operations, leveraging Hugging Face for free text summarization and Google Translate for language detection and translation.

## Overview

ChatTextGenius is designed for seamless communication with real-time language processing features:
- **Send Messages:** Chat with an assistant that echoes your input.
- **Translate Messages:** Convert messages into English, Portuguese, Spanish, Russian, Turkish, or French.
- **Summarize Messages:** Condense long messages into concise summaries, prefixed with "summarised answer:-" and highlighted in yellow.
- **Loading Indicators:** Show a processing spinner during operations like sending, translating, or summarizing.
- **Auto-Scroll:** Automatically focus on new messages in the chat.
- **Timestamps:** Display the time of each message in the output box.

The backend uses Hugging Face’s free inference API for summarization, avoiding the need for paid API subscriptions like OpenAI.

## Features
- **Real-time Chat:** Interactive chat interface with user and assistant messages.
- **Language Detection & Translation:** Uses Google Translate API for detecting languages and translating messages.
- **Text Summarization:** Leverages Hugging Face’s `facebook/bart-large-cnn` model for free, abstractive summarization.
- **Responsive Design:** Built with Tailwind CSS for a clean, modern UI.
- **Sidebar Navigation:** Manage chat history, create new chats, and clear history.
- **Loading States:** Visual feedback during processing with a spinning loader.
- **Auto-Focus:** Scrolls automatically to new messages.
- **Timestamps:** Shows message timestamps for tracking conversation timing.

## Prerequisites
- **Node.js** (v18 or higher, recommended v22.11.0 or later)
- **npm** (Node Package Manager)
- **Hugging Face Account:** For free summarization API token (no payment required).
- **Google Translate API Key:** For language detection and translation.

## Installation

### 1. Clone the Repository
```bash
git clone <https://github.com/toptech5419/myHNGInternship-journey.git>  
cd chattextgenius
```

### 2. Backend Setup
1. Ensure `server.js` and `.env` are in the project root (outside `src`).
2. Install backend dependencies:
   ```bash
   npm install express @huggingface/inference cors dotenv
   ```
3. Create or update `.env` in the project root with your Hugging Face API token:
   ```
   HF_API_TOKEN=hf_your_token_here
   ```
   - Get a free token from [Hugging Face](https://huggingface.co/settings/tokens).

### 3. Frontend Setup
1. Navigate to the project root.
2. Install frontend dependencies:
   ```bash
   npm install axios uuid
   ```
3. Ensure `package.json` includes `"type": "module"` for ES Modules:
   ```json
   {
     "type": "module",
     "dependencies": {
       "axios": "^x.x.x",
       "uuid": "^x.x.x"
     },
     "devDependencies": {
       "vite": "^x.x.x",
       "@types/react": "^x.x.x",
       "@types/react-dom": "^x.x.x"
     }
   }
   ```

### 4. API Keys
- **Google Translate API Key:** Replace `key` in `Index.tsx` with your own key from the [Google Cloud Console](https://console.cloud.google.com/).
- **Hugging Face API Token:** Already configured in `.env`.

## Running the Application

### 1. Start the Backend Server
Open a terminal in the project root and run:
```bash
node server.js
```
- Confirm: `Server running on port 3000`.

### 2. Start the Frontend
In a separate terminal, run:
```bash
npm run dev
```
- Vite should start on `http://localhost:8080` (or another port if configured differently). Open this URL in your browser.

## Usage
1. Open the app in your browser (e.g., `http://localhost:8080`).
2. Use the chat interface to:
   - Send messages by typing and pressing enter or the send button.
   - Translate messages using the dropdown menu (More options > Translate to...).
   - Summarize long messages (over 150 characters) via the dropdown menu (More options > Summarize).
3. New messages auto-scroll into view and display timestamps (e.g., "3:45:12 PM").
4. Summarized messages show with "summarised answer:-" and a yellow background.
5. A loading spinner appears during processing (sending, translating, or summarizing).

## Project Structure
```
chattextgenius/
├── .env              # Environment variables (Hugging Face token)
├── server.js         # Node.js/Express backend for summarization
├── package.json      # Project dependencies and scripts
├── src/
│   ├── pages/        # React components
│   │   └── Index.tsx # Main chat interface
│   ├── components/   # UI components (ChatHeader, ChatSidebar, ChatMessage, ChatInput, etc.)
│   └── lib/          # Utility functions (e.g., cn from utils)
└── node_modules/     # Dependency packages
```

## Dependencies
- **Backend (`server.js`):**
  - `express`: Web server framework
  - `@huggingface/inference`: Hugging Face API for summarization
  - `cors`: Cross-Origin Resource Sharing middleware
  - `dotenv`: Environment variable management

- **Frontend (`Index.tsx`):**
  - `axios`: HTTP client for API calls
  - `uuid`: Unique ID generation
  - `react`, `react-dom`: React framework
  - `tailwindcss`: Styling (assumed)

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m "description"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License
This project is open-source under the [MIT License](LICENSE). See the `LICENSE` file for details.

## Acknowledgments
- [Hugging Face](https://huggingface.co/) for free inference API and models.
- [Google Cloud](https://cloud.google.com/translate) for Translate API.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [Vite](https://vitejs.dev/) for fast React development.

## Contact
For questions or support, reach out to [your-email@example.com](mailto:alabitemitope51@gmail.com) or open an issue on the repository.

---

