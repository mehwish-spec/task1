import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import AppSidebar from '../components/app/AppSidebar.jsx';
import styles from './VidTicketRecord.module.css';

const DEVICE_OPTIONS = {
  mic: { icon: '🎙️', options: ['MacBook Pro Microphone', 'External USB Mic'] },
  speaker: { icon: '🔊', options: ['AirPods', 'MacBook Pro Speakers'] },
  camera: { icon: '🎥', options: ['FaceTime HD Camera', 'External Webcam'] },
};

// Falls back to a plain "video/webm" MediaRecorder if none of these are
// supported — most evergreen browsers support at least one.
const PREFERRED_MIME_TYPES = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm', 'video/mp4'];

function getSupportedMimeType() {
  if (typeof MediaRecorder === 'undefined' || !MediaRecorder.isTypeSupported) return undefined;
  return PREFERRED_MIME_TYPES.find((type) => MediaRecorder.isTypeSupported(type));
}

function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

// The reply-length stepper on the previous step (VidTicketNew) defaults to
// 90 seconds — this is only used as a fallback if this page is reached
// without that route state (e.g. a direct link or a page refresh).
const DEFAULT_MAX_SECONDS = 90;

// A single dropdown used for the mic/speaker/camera pickers below the
// preview. Fully functional (opens, picks, closes) even though there's no
// real device API behind it — this is a demo.
function DeviceSelect({ deviceKey }) {
  const { icon, options } = DEVICE_OPTIONS[deviceKey];
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className={styles.deviceSelect}>
      <button type="button" className={styles.deviceBtn} onClick={() => setOpen((prev) => !prev)}>
        <span className={styles.deviceIcon} aria-hidden="true">
          {icon}
        </span>
        <span className={styles.deviceLabel}>{selected}</span>
        <span className={styles.deviceChevron}>⌄</span>
      </button>
      {open && (
        <ul className={styles.deviceMenu}>
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                className={styles.deviceOption}
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Step 2 of the "create a Vid Ticket" wizard: record the prompt video
// students will see. This is a genuine recording now — react-webcam's live
// camera/mic stream is captured with MediaRecorder, counts down from the
// reply-length limit set on the previous step, and stops itself
// automatically when time runs out (same as clicking the record button
// again to stop early). The finished recording is saved right there on the
// page as a local blob URL and is really playable, not a placeholder.
function VidTicketRecord() {
  const navigate = useNavigate();
  const location = useLocation();
  const maxSeconds = location.state?.maxSeconds ?? DEFAULT_MAX_SECONDS;

  const [stage, setStage] = useState('idle'); // 'idle' | 'recording' | 'done'
  const [mirrored, setMirrored] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(maxSeconds);
  const [recordedUrl, setRecordedUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // Falls back to the gradient placeholder if the browser denies camera
  // permission or has no camera at all — react-webcam surfaces that via
  // onUserMediaError rather than throwing.
  const [cameraError, setCameraError] = useState(false);

  const webcamRef = useRef(null);
  const videoPlaybackRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const timerRef = useRef(null);

  const isDone = stage === 'done';
  const isRecording = stage === 'recording';

  const clearCountdown = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopRecording = () => {
    clearCountdown();
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    }
  };

  // The countdown ticks every second while recording; when it hits zero,
  // this effect (not the interval callback itself) stops the recording —
  // keeping the state updater above pure and side-effect-free.
  useEffect(() => {
    if (isRecording && remainingSeconds <= 0) {
      stopRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording, remainingSeconds]);

  // Stop any in-progress recording/timer if the person navigates away
  // mid-recording (e.g. the back button), and release the recorded blob URL
  // when it's no longer needed.
  useEffect(() => {
    return () => {
      clearCountdown();
      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state !== 'inactive') {
        recorder.stop();
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (recordedUrl) URL.revokeObjectURL(recordedUrl);
    };
  }, [recordedUrl]);

  const handleRecordClick = () => {
    if (stage === 'recording') {
      stopRecording();
      return;
    }

    const stream = webcamRef.current?.stream;
    if (!stream) {
      // No camera/mic stream available (denied permission, no device, or
      // still connecting) — nothing to record.
      return;
    }

    recordedChunksRef.current = [];
    const mimeType = getSupportedMimeType();
    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: recorder.mimeType || 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return url;
      });
      setStage('done');
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setRemainingSeconds(maxSeconds);
    setStage('recording');
    timerRef.current = window.setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
  };

  const handleReRecord = () => {
    if (recordedUrl) URL.revokeObjectURL(recordedUrl);
    setRecordedUrl(null);
    setIsPlaying(false);
    setRemainingSeconds(maxSeconds);
    setStage('idle');
  };

  const handleTogglePlayback = () => {
    const video = videoPlaybackRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleContinue = () => {
    if (!isDone) return;
    navigate('/app/new-ticket/assess');
  };

  const stageLabel = isRecording
    ? `Recording... ${formatDuration(remainingSeconds)} left`
    : isDone
      ? 'Great vid ticket request!'
      : (
          <>
            Record your question.
            <br />
            Students will watch this before replying.
          </>
        );

  return (
    <div className={styles.shell}>
      <div className={styles.frame}>
        <AppSidebar variant="ticket" />

        <main className={styles.main}>
          <div className={styles.header}>
            <button
              type="button"
              className={styles.backCircle}
              aria-label="Back to question settings"
              onClick={() => navigate('/app/new-ticket')}
            >
              ←
            </button>
            <h1 className={styles.pageTitle}>Vid Ticket</h1>
          </div>

          <div className={styles.progressBar} aria-hidden="true">
            <span className={`${styles.progressSegment} ${styles.progressActive}`} />
            <span className={`${styles.progressSegment} ${styles.progressActive}`} />
            <span className={styles.progressSegment} />
          </div>

          <div className={styles.recordCard}>
            <p className={`${styles.stageLabel} ${isRecording ? styles.stageLabelRecording : ''}`}>{stageLabel}</p>

            <div className={styles.previewWrap}>
              {isDone ? (
                recordedUrl ? (
                  <video
                    ref={videoPlaybackRef}
                    src={recordedUrl}
                    className={`${styles.previewVideo} ${mirrored ? styles.previewMirrored : ''}`}
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />
                ) : (
                  <div className={`${styles.previewImg} ${mirrored ? styles.previewMirrored : ''}`} aria-hidden="true" />
                )
              ) : cameraError ? (
                <div className={`${styles.previewImg} ${mirrored ? styles.previewMirrored : ''}`} aria-hidden="true" />
              ) : (
                <Webcam
                  ref={webcamRef}
                  audio
                  muted
                  mirrored={mirrored}
                  className={styles.previewVideo}
                  onUserMediaError={() => setCameraError(true)}
                />
              )}

              {cameraError && !isDone && (
                <span className={styles.cameraFallbackBadge}>Camera unavailable — showing preview</span>
              )}

              {isRecording && (
                <span className={styles.recPulse} aria-hidden="true">
                  <span className={styles.recDotSmall} />
                  {formatDuration(remainingSeconds)}
                </span>
              )}

              {!isDone && (
                <div className={styles.recordControls}>
                  <button
                    type="button"
                    className={`${styles.recordCircle} ${isRecording ? styles.recordCircleActive : ''}`}
                    onClick={handleRecordClick}
                    disabled={cameraError}
                    aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                  />
                  <button
                    type="button"
                    className={styles.flipBtn}
                    onClick={() => setMirrored((prev) => !prev)}
                    aria-label="Flip camera"
                  >
                    ⟲
                  </button>
                </div>
              )}

              {isDone && recordedUrl && (
                <button
                  type="button"
                  className={`${styles.playOverlay} ${isPlaying ? styles.playOverlayPlaying : ''}`}
                  onClick={handleTogglePlayback}
                  aria-label={isPlaying ? 'Pause recording' : 'Play recording'}
                >
                  <span className={styles.playCircle} aria-hidden="true">
                    {isPlaying ? '❙❙' : '▶'}
                  </span>
                </button>
              )}
            </div>

            {isDone ? (
              <button type="button" className={styles.reRecordBtn} onClick={handleReRecord}>
                🗑️ Re-record
              </button>
            ) : (
              <div className={styles.deviceRow}>
                <DeviceSelect deviceKey="mic" />
                <DeviceSelect deviceKey="speaker" />
                <DeviceSelect deviceKey="camera" />
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.continueBtn} ${isDone ? styles.continueBtnEnabled : ''}`}
              onClick={handleContinue}
              disabled={!isDone}
            >
              Continue →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default VidTicketRecord;
