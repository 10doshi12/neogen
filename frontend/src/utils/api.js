// API utility functions for backend communication

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Generate a video from a prompt
 * @param {string} prompt - User's video prompt
 * @param {number} duration - Video duration in seconds
 * @param {string} orientation - Video orientation ("horizontal" or "vertical")
 * @returns {Promise<{task_id: string, status_url: string, message: string}>}
 */
export async function generateVideo(prompt, duration = 20, orientation = 'horizontal') {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        video_length_seconds: duration,
        orientation,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating video:', error);
    throw error;
  }
}

/**
 * Check the status of a video generation task
 * @param {string} taskId - Task ID from generateVideo
 * @returns {Promise<{status: string, message: string, video_filename?: string, download_url?: string}>}
 */
export async function checkStatus(taskId) {
  try {
    const response = await fetch(`${API_BASE_URL}/status/${taskId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking status:', error);
    throw error;
  }
}

/**
 * Poll the status endpoint until completion or error
 * @param {string} taskId - Task ID to poll
 * @param {Function} onUpdate - Callback function called on each status update
 * @param {number} interval - Polling interval in milliseconds
 * @param {number} timeout - Maximum time to poll in milliseconds
 * @returns {Promise<{status: string, message: string, video_filename?: string, download_url?: string}>}
 */
export async function pollStatus(taskId, onUpdate, interval = 2000, timeout = 600000) {
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        // Check if timeout exceeded
        if (Date.now() - startTime > timeout) {
          reject(new Error('Timeout: Video generation took too long'));
          return;
        }

        const status = await checkStatus(taskId);
        
        // Call update callback
        if (onUpdate) {
          onUpdate(status);
        }

        // Check if complete or error
        if (status.status === 'complete') {
          resolve(status);
        } else if (status.status === 'error') {
          reject(new Error(status.message || 'Video generation failed'));
        } else {
          // Continue polling
          setTimeout(poll, interval);
        }
      } catch (error) {
        reject(error);
      }
    };

    // Start polling
    poll();
  });
}

/**
 * Get the full download URL for a video
 * @param {string} taskId - Task ID
 * @param {string} filename - Video filename (e.g., "final_video.mp4")
 * @returns {string} Full download URL
 */
export function getVideoUrl(taskId, filename = 'final_video.mp4') {
  return `${API_BASE_URL}/download/${taskId}/${filename}`;
}

/**
 * Download a video file
 * @param {string} taskId - Task ID
 * @param {string} filename - Video filename
 */
export function downloadVideo(taskId, filename = 'final_video.mp4') {
  const url = getVideoUrl(taskId, filename);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
