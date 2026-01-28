import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useAssignments } from '../hooks/useAssignments';
import { extractYouTubeVideoId, getYouTubeEmbedUrl } from '../utils/youtube';

function AssignmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAssignment, updateAssignment } = useAssignments();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [section, setSection] = useState('');
  
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [contentFontSize, setContentFontSize] = useState(16); // px
  const contentEditorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!id) return;

    // Load initial values once when the component mounts / id changes.
    const assignment = getAssignment(parseInt(id));
    if (assignment) {
      setContent(assignment.content || '');
      setTitle(assignment.title);
      setSection(assignment.section);
      setYoutubeUrl(assignment.youtubeUrl || '');
    } else {
      // Assignment not found, redirect to home
      navigate('/');
    }
    // We intentionally do NOT include getAssignment in the deps array,
    // otherwise this effect would run on every render and keep resetting
    // the local form state, making the inputs appear read-only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate]);

  const handleSave = () => {
    if (!id) return;

    // When saving from edit mode, read the current HTML from the editor
    // so we capture any rich-text formatting (bold, etc.).
    let nextContent = content;
    if (contentEditorRef.current) {
      nextContent = contentEditorRef.current.innerHTML;
      setContent(nextContent);
    }

    updateAssignment(parseInt(id), {
      content: nextContent,
      title,
      section,
      youtubeUrl
    });
    setIsEditing(false);
  };

  const increaseFontSize = () => {
    setContentFontSize((size) => Math.min(size + 2, 28)); // max 28px
  };

  const decreaseFontSize = () => {
    setContentFontSize((size) => Math.max(size - 2, 12)); // min 12px
  };

  const applyBoldToSelection = () => {
    const editor = contentEditorRef.current;
    if (!editor) return;

    // Ensure the editor has focus so the current selection is inside it
    editor.focus();

    // Use the browser's built-in rich text command to bold the selection.
    // This affects only the selected text inside the contentEditable region.
    document.execCommand('bold');
  };

  const undoInEditor = () => {
    const editor = contentEditorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand('undo');
  };

  const redoInEditor = () => {
    const editor = contentEditorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand('redo');
  };

  const videoId = extractYouTubeVideoId(youtubeUrl);
  const embedUrl = videoId ? getYouTubeEmbedUrl(videoId) : null;

  const assignment = id ? getAssignment(parseInt(id)) : undefined;

  if (!assignment) {
    return null;
  }

  // When entering edit mode, initialise the contentEditable DOM with the
  // latest saved content. We do this once per edit session so the browser
  // can manage its own undo/redo history without React re-rendering on
  // every keystroke.
  useEffect(() => {
    if (isEditing && contentEditorRef.current) {
      contentEditorRef.current.innerHTML = content || '';
    }
  }, [isEditing, content]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-x-hidden">
      <div className="max-w-5xl w-full mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 mb-8 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Assignments
        </button>

        <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Section</label>
                <input
                  type="text"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">YouTube Video URL</label>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/... or https://youtube.com/shorts/..."
                />
                <p className="text-white text-sm mt-2">
                  Paste any YouTube video URL or Shorts URL. The video will be embedded and playable on this page.
                </p>
                {youtubeUrl && !videoId && (
                  <p className="text-red-400 text-sm mt-2">
                    Invalid YouTube URL. Please check the format.
                  </p>
                )}
                {videoId && (
                  <p className="text-white text-sm mt-2">
                    ✓ Valid YouTube URL detected {youtubeUrl.includes('/shorts/') ? '(Shorts)' : '(Video)'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Content</label>

                {/* Formatting controls - only available in edit mode */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-sm text-gray-400 mr-2">Formatting:</span>
                  <button
                    type="button"
                    onClick={decreaseFontSize}
                    className="px-3 py-1 rounded-md bg-slate-800 text-white text-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Decrease content font size"
                  >
                    A-
                  </button>
                  <button
                    type="button"
                    onClick={increaseFontSize}
                    className="px-3 py-1 rounded-md bg-slate-800 text-white text-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Toggle content font size"
                  >
                    A+
                  </button>
                  <button
                    type="button"
                    onClick={applyBoldToSelection}
                    className="px-3 py-1 rounded-md text-sm bg-slate-800 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Toggle bold content text"
                  >
                    B
                  </button>         
                </div>

                <div
                  ref={contentEditorRef}
                  contentEditable
                  className="w-full min-h-[240px] px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 font-sans whitespace-pre-wrap break-words"
                  style={{
                    fontSize: `${contentFontSize}px`
                  }}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-2">
                  {section}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {title}
                </h1>
            
              </div>

              <div className="mb-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
                >
                  Edit Content
                </button>
              </div>

              {embedUrl && (
                <div className="mb-8 bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">Video</h3>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={embedUrl}
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube video player"
                    />
                  </div>
                </div>
              )}

              <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700/50 max-w-full overflow-x-hidden">
                {content ? (
                  <div
                    className="text-gray-300 font-sans leading-relaxed whitespace-pre-wrap break-words max-w-full"
                    // Render saved rich text (e.g. bold selections) safely within this block
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <p className="text-gray-500 text-center italic py-8">
                    No content yet. Click "Edit Content" to add your assignment content.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignmentDetail;
