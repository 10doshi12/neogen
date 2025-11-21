# NeoGen - AI Video Generation Platform

An AI-powered video generation platform that creates engaging videos from text prompts. The system uses Google's Generative AI to create scripts, sources stock footage from Pexels, adds background music from Freesound, and generates styled subtitles using MoviePy.

## 🎯 Features

- **AI-Driven Script Generation**: Powered by Google Gemini AI
- **Automatic Video Assembly**: Combines stock footage, AI-generated images, and transitions
- **Smart Subtitle Generation**: Synced subtitles with viral-style editing (2-4 words at a time)
- **Background Music Integration**: Automatic music search and download via Freesound API
- **Multiple Orientations**: Support for both horizontal (16:9) and vertical (9:16) videos
- **Customizable Duration**: Generate videos of specific lengths (default: 20 seconds)
- **Asynchronous Processing**: Non-blocking video generation with status polling

## 🛠️ Tech Stack

### Backend
- **FastAPI**: High-performance async API framework
- **MoviePy**: Video editing and composition
- **Google Generative AI**: Script and content generation
- **Google Cloud**: AI Platform and Storage integration
- **Pexels API**: Stock video footage
- **Freesound API**: Background music

### Frontend
- **React 18**: Modern UI framework
- **Vite**: Fast development and build tool
- **React Router**: Client-side routing

## 📁 Project Structure

```
neogen/
├── video_backend/          # FastAPI backend
│   ├── services/           # AI, video, audio, and stock services
│   ├── utils/              # Helper utilities
│   ├── main.py             # API endpoints
│   ├── config.py           # Configuration and API keys
│   ├── schemas.py          # Pydantic models
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/                # Source code
│   ├── public/             # Static assets
│   └── package.json        # Node dependencies
└── gen-lang-client-*.json  # Google Cloud service account key
```

## 🚀 Setup Instructions

### Prerequisites

- **Python 3.8+**
- **Node.js 16+** and npm
- **Google Cloud Account** with Generative AI API enabled
- **API Keys** for:
  - Google Generative AI (Gemini)
  - Pexels
  - Freesound

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd video_backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create a `.env` file** in `video_backend/` with the following variables:
   ```env
   GOOGLE_API_KEY=your_google_gemini_api_key
   PEXELS_API_KEY=your_pexels_api_key
   FREESOUND_API_KEY=your_freesound_api_key
   GOOGLE_APPLICATION_CREDENTIALS=../gen-lang-client-0776298793-405aa8e41c51.json
   ```

5. **Ensure the Google Cloud service account JSON file** is in the root directory

6. **Run the backend server:**
   ```bash
   python main.py
   ```
   Or using uvicorn:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in `frontend/` (if needed):
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 📝 Usage

1. **Start both servers** (backend and frontend)
2. **Open the frontend** in your browser at `http://localhost:5173`
3. **Enter a video prompt** (e.g., "Create a video about future technology")
4. **Select orientation** (horizontal or vertical) and duration
5. **Click generate** and wait for the video to be processed
6. **View and download** your generated video

## 🔌 API Endpoints

- `POST /generate-video` - Start video generation (returns task_id)
- `GET /status/{task_id}` - Check generation status
- `GET /download/{task_id}/{filename}` - Download generated video

## 🧪 Testing

The backend includes several test scripts:
- `test_video_gen.py` - Test video generation
- `test_audio_service.py` - Test Freesound integration
- `verify_*.py` - Various verification scripts for effects, orientation, and pacing

## 🤝 Contributing

This is a personal project for AI video generation experimentation.

## 📄 License

Private project - All rights reserved.
