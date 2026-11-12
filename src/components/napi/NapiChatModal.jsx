import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth, API_BASE_URL } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { analyzeThesisSimilarity, QUICK_PROMPTS } from '../../data/napiKnowledge';
import napiLogo from '../../assets/napi-logo.png';
import {
  Bot,
  Send,
  X,
  RotateCcw,
  Copy,
  Check,
  TrendingUp
} from 'lucide-react';

const getSyncRole = (user) => {
  if (!user) return 'estudiante';
  if (user.rol && user.rol !== 'guest') return user.rol;
  if (user.role === 'teacher') return 'docente';
  if (user.role === 'admin') return 'administrador';
  return 'estudiante';
};

const getDefaultGreeting = (user) => {
  if (user && user.role !== 'guest' && user.name) {
    return {
      id: 'greeting-1',
      sender: 'napi',
      isGreeting: true,
      text: `¡Hola ${user.name.split(' ')[0]}! Soy NAPI, tu asistente de proyectos de título para ${user.career || 'INACAP Sede Maipú'} 🤖✨\n\nEscribe la idea de tu proyecto de título y analizaré su similitud con el repositorio oficial en la nube.`,
      ts: 'Ahora'
    };
  }
  return {
    id: 'greeting-1',
    sender: 'napi',
    isGreeting: true,
    text: '¡Hola! Soy NAPI, tu asistente de titulación para INACAP Sede Maipú 🤖✨\n\nEscribe el título de tu propuesta y analizo la similitud al instante.',
    ts: 'Ahora'
  };
};

export const NapiChatModal = () => {
  const {
    user,
    isNapiOpen,
    closeNapi,
    napiInitialPrompt,
    openNapi,
    projects,
    openProjectDetail
  } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [messages, setMessages] = useState(() => [getDefaultGreeting(user)]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [copied, setCopied] = useState(null);
  const endRef = useRef(null);
  const loadedUserRef = useRef('');

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, loadingHistory]);

  // Persistir mensaje en Supabase para que esté disponible en web y móvil
  const persistMessage = useCallback(
    async (sender, text, metadata = {}) => {
      if (!user || user.role === 'guest' || !user.email) return;
      const syncRole = getSyncRole(user);
      try {
        await fetch(`${API_BASE_URL}/api/chat/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            role: syncRole,
            sender,
            text,
            message: text,
            metadata
          })
        });
      } catch (err) {
        console.warn('No se pudo persistir el mensaje en Supabase:', err);
      }
    },
    [user]
  );

  // Cargar historial de chat desde Supabase cuando un usuario autenticado abre NAPI
  const loadChatHistory = useCallback(async () => {
    if (!user || user.role === 'guest' || !user.email) {
      setMessages([getDefaultGreeting(user)]);
      return;
    }

    setLoadingHistory(true);
    try {
      const syncRole = getSyncRole(user);
      // Consultar con el rol del usuario y con el rol equivalente en español usado en la web
      const primaryUrl = `${API_BASE_URL}/api/chat/history?email=${encodeURIComponent(user.email)}&role=${encodeURIComponent(user.role)}`;
      const webSyncUrl =
        syncRole !== user.role
          ? `${API_BASE_URL}/api/chat/history?email=${encodeURIComponent(user.email)}&role=${encodeURIComponent(syncRole)}`
          : null;

      const responses = await Promise.all([
        fetch(primaryUrl).catch(() => null),
        webSyncUrl ? fetch(webSyncUrl).catch(() => null) : Promise.resolve(null)
      ]);

      const mergedMap = new Map();
      for (const res of responses) {
        if (res && res.ok) {
          const data = await res.json();
          if (Array.isArray(data?.messages)) {
            data.messages.forEach((m) => {
              const msgText = m.message || m.text || '';
              if (!msgText && m.sender !== 'card') return;
              const key = m.id || `${m.sender}-${m.created_at}-${msgText.slice(0, 24)}`;
              if (!mergedMap.has(key)) {
                mergedMap.set(key, m);
              }
            });
          }
        }
      }

      const rawList = Array.from(mergedMap.values()).sort((a, b) => {
        const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
        const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
        return ta - tb;
      });

      if (rawList.length > 0) {
        const formatted = rawList
          .filter((m) => m.sender === 'user' || m.sender === 'napi')
          .map((m, idx) => {
            let tsLabel = 'Sincronizado';
            if (m.created_at) {
              try {
                const d = new Date(m.created_at);
                tsLabel = d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
              } catch (e) {}
            }
            return {
              id: m.id || `hist-${idx}-${Date.now()}`,
              sender: m.sender === 'user' ? 'user' : 'napi',
              text: (m.message || m.text || '').replace(/<[^>]*>/g, ''),
              analysis: m.metadata?.analysis || null,
              ts: tsLabel
            };
          });

        if (formatted.length > 0) {
          setMessages(formatted);
          return;
        }
      }

      setMessages([getDefaultGreeting(user)]);
    } catch (err) {
      console.warn('Error cargando historial de chat desde Supabase:', err);
      setMessages([getDefaultGreeting(user)]);
    } finally {
      setLoadingHistory(false);
    }
  }, [user]);

  // Recargar historial al abrir el modal o cambiar de usuario
  useEffect(() => {
    if (!isNapiOpen) return;
    const userKey = `${user?.email || 'guest'}_${user?.role || 'guest'}`;
    if (loadedUserRef.current !== userKey) {
      loadedUserRef.current = userKey;
      loadChatHistory();
    }
  }, [isNapiOpen, user?.email, user?.role, loadChatHistory]);

  // Limpiar referencia al cerrar sesión
  useEffect(() => {
    if (!user || user.role === 'guest') {
      loadedUserRef.current = '';
      setMessages([getDefaultGreeting(null)]);
    }
  }, [user]);

  const handleSend = useCallback(
    async (overrideText) => {
      const q = (typeof overrideText === 'string' ? overrideText : input).trim();
      if (!q || typing) return;

      const userMsgId = `usr-${Date.now()}`;
      const userMessageObj = {
        id: userMsgId,
        sender: 'user',
        text: q,
        ts: 'Ahora'
      };

      // Construir historial previo para el contexto conversacional del motor RAG
      const historyForApi = messages
        .filter((m) => !m.isGreeting && (m.sender === 'user' || m.sender === 'napi') && m.text)
        .slice(-8)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          content: m.text
        }));

      setMessages((prev) => [...prev, userMessageObj]);
      if (typeof overrideText !== 'string') {
        setInput('');
      }
      setTyping(true);

      // Persistir consulta del usuario en Supabase
      persistMessage('user', q, {});

      const requestAnalyze = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/api/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: q,
              carrera: user?.career || null,
              history: historyForApi
            })
          });
          if (!res.ok) return null;
          const data = await res.json();
          if (data && data.analisis) return data;
          return null;
        } catch (err) {
          return null;
        }
      };

      let data = await requestAnalyze();
      if (!data) {
        // Reintento breve por si la instancia Free de Render estaba despertando
        await new Promise((r) => setTimeout(r, 1000));
        data = await requestAnalyze();
      }

      let replyObj;

      if (data && data.analisis) {
        const topSim = Math.round(Number(data.top_similitud || 0));
        const originalityScore = Math.max(0, Math.min(100, 100 - topSim));
        const hasMatches = Array.isArray(data.similares) && data.similares.length > 0 && historyForApi.length === 0;

        let analysisCard = null;
        if (hasMatches) {
          const matches = data.similares.slice(0, 3).map((sim) => {
            const simPct = Math.round(
              sim.porcentaje_similitud ?? (sim.similitud ? sim.similitud * 100 : topSim)
            );
            const matchedProject =
              projects.find(
                (p) =>
                  String(p.id) === String(sim.id) ||
                  p.title?.toLowerCase() === String(sim.titulo || '').toLowerCase()
              ) || {
                id: sim.id || `sim-${Math.random()}`,
                title: sim.titulo || 'Proyecto INACAP',
                summary: sim.resumen || 'Proyecto indexado en el repositorio de INACAP Sede Maipú.',
                career: sim.carrera || 'INACAP Sede Maipú',
                year: String(sim.anio || '2025'),
                authors: sim.autores
                  ? String(sim.autores)
                      .split(',')
                      .map((a) => a.trim())
                  : ['Estudiante INACAP'],
                advisor: 'Prof. Sede Maipú',
                stack: ['Repositorio Oficial'],
                originalityScore: Math.max(0, 100 - simPct),
                status: 'Publicado'
              };

            return {
              project: matchedProject,
              similarity: simPct
            };
          });

          analysisCard = {
            originalityScore,
            similarityScore: topSim,
            level:
              data.nivel_riesgo === 'ALTO'
                ? 'Alta Similitud con Tesis Previas'
                : data.nivel_riesgo === 'MEDIO'
                  ? 'Similitud Moderada (Requiere Diferenciación)'
                  : 'Alta Originalidad en Sede Maipú',
            matches
          };
        }

        replyObj = {
          id: `napi-${Date.now() + 1}`,
          sender: 'napi',
          text: data.analisis,
          analysis: analysisCard,
          ts: 'Ahora'
        };
      } else {
        // Respaldo local si no hay conexión a internet
        const fallback = analyzeThesisSimilarity(q, '', '', projects);
        const fallbackText = `${fallback.level}.\n\n• ${fallback.tips.join('\n• ')}`;
        replyObj = {
          id: `napi-${Date.now() + 1}`,
          sender: 'napi',
          text: fallbackText,
          analysis: {
            originalityScore: fallback.originalityScore,
            similarityScore: fallback.similarityScore,
            level: fallback.level,
            matches: fallback.matches || []
          },
          ts: 'Ahora'
        };
      }

      setMessages((prev) => [...prev, replyObj]);
      setTyping(false);

      // Persistir respuesta de NAPI en Supabase
      persistMessage('napi', replyObj.text, replyObj.analysis ? { analysis: replyObj.analysis } : {});
    },
    [input, typing, messages, user, projects, persistMessage]
  );

  // Ejecutar prompt inicial cuando se abre desde otro botón (ej. "Consultar NAPI")
  useEffect(() => {
    if (napiInitialPrompt && isNapiOpen && napiInitialPrompt.length > 3) {
      const promptToRun = napiInitialPrompt;
      openNapi(''); // limpiar prompt inicial para no re-ejecutarlo
      handleSend(promptToRun);
    }
  }, [napiInitialPrompt, isNapiOpen, openNapi, handleSend]);

  if (!isNapiOpen) return null;

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const resetChat = async () => {
    if (user && user.role !== 'guest' && user.email) {
      const syncRole = getSyncRole(user);
      try {
        await Promise.all([
          fetch(
            `${API_BASE_URL}/api/chat/history?email=${encodeURIComponent(user.email)}&role=${encodeURIComponent(user.role)}`,
            { method: 'DELETE' }
          ).catch(() => {}),
          syncRole !== user.role
            ? fetch(
                `${API_BASE_URL}/api/chat/history?email=${encodeURIComponent(user.email)}&role=${encodeURIComponent(syncRole)}`,
                { method: 'DELETE' }
              ).catch(() => {})
            : Promise.resolve()
        ]);
      } catch (err) {
        console.warn('Error al limpiar historial en Supabase:', err);
      }
    }

    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'napi',
        isGreeting: true,
        text: 'Historial reiniciado en la nube. Escribe tu propuesta de tesis 👇',
        ts: 'Ahora'
      }
    ]);
  };

  return (
    <>
      <div
        className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity"
        onClick={closeNapi}
      />

      <div
        className={`absolute bottom-20 right-3 sm:right-4 z-50 flex flex-col w-[325px] max-w-[calc(100%-1.5rem)] h-[440px] max-h-[62vh] rounded-2xl shadow-2xl border overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-200 transition-colors ${
          isDark
            ? 'bg-[#0f172a] text-slate-100 border-slate-700 shadow-black/80'
            : 'bg-white text-[#0f2942] border-slate-200 shadow-xl'
        }`}
      >
        {/* Header NAPI */}
        <div
          className={`flex items-center justify-between px-3.5 py-2.5 shrink-0 border-b ${
            isDark ? 'bg-[#0a192f] border-slate-800' : 'bg-[#0f2942] border-[#163a5c]'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="relative bg-white p-1 rounded-xl border border-slate-200 shadow-sm shrink-0">
              <img src={napiLogo} alt="NAPI" className="w-6 h-4.5 object-contain" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-[#0f2942]" />
            </div>
            <div>
              <p className="text-xs font-black text-white tracking-wide">N.A.P.I.</p>
              <p className="text-[9px] text-blue-200 font-semibold">
                {user && user.role !== 'guest'
                  ? `Sincronizado • ${user.name.split(' ')[0]}`
                  : 'Asistente IA • INACAP Maipú'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={resetChat}
              title="Limpiar historial de chat"
              className="p-1.5 text-slate-300 hover:text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={closeNapi}
              title="Cerrar"
              className="p-1.5 text-slate-300 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sugerencias rápidas */}
        <div
          className={`px-2.5 py-1.5 flex gap-1.5 overflow-x-auto shrink-0 border-b ${
            isDark ? 'bg-[#162032] border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p.id}
              type="button"
              disabled={typing}
              onClick={() => handleSend(p.text)}
              className={`whitespace-nowrap px-2 py-0.5 rounded-full text-[9px] font-semibold shrink-0 transition-colors border disabled:opacity-50 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-[#0f2942] border-slate-200 shadow-xs'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Mensajes */}
        <div
          className={`flex-1 p-3 overflow-y-auto space-y-2.5 text-xs ${
            isDark ? 'bg-[#0b1320]' : 'bg-[#f8fafc]'
          }`}
        >
          {loadingHistory && (
            <div className="flex items-center justify-center gap-2 text-slate-400 text-[10px] py-4">
              <Bot className="w-3.5 h-3.5 animate-spin text-blue-500" />
              <span>Sincronizando historial con Supabase...</span>
            </div>
          )}

          {!loadingHistory &&
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl p-2.5 space-y-2 text-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#0f2942] text-white rounded-br-none shadow-sm'
                      : isDark
                        ? 'bg-[#162032] text-slate-100 border border-slate-800 rounded-bl-none shadow-sm'
                        : 'bg-white text-[#0f2942] border border-slate-200 shadow-xs rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line text-[11px]">{msg.text}</p>

                  {msg.analysis && (
                    <div
                      className={`mt-2 pt-2 border-t space-y-2 ${
                        isDark ? 'border-slate-800' : 'border-slate-100'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-[#0f2942] text-white space-y-1.5 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-semibold text-blue-200">Originalidad:</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-600 text-white">
                            {msg.analysis.originalityScore}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-400"
                            style={{ width: `${msg.analysis.originalityScore}%` }}
                          />
                        </div>
                        <p className="text-[9px] text-blue-200">{msg.analysis.level}</p>
                      </div>

                      {msg.analysis.matches?.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold flex items-center gap-1 text-slate-400">
                            <TrendingUp className="w-3 h-3 text-blue-500" /> Proyectos similares en Supabase:
                          </p>
                          {msg.analysis.matches.slice(0, 3).map((m, i) => (
                            <div
                              key={i}
                              onClick={() => openProjectDetail(m.project)}
                              className={`p-1.5 rounded-xl border flex items-center justify-between cursor-pointer text-[9px] transition-colors ${
                                isDark
                                  ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700'
                                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <span className="font-semibold truncate max-w-[140px]">
                                {m.project.title}
                              </span>
                              <span className="font-bold text-blue-500 shrink-0">
                                {m.similarity}% sim.
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            msg.id,
                            `NAPI · Originalidad: ${msg.analysis.originalityScore}%\n${msg.analysis.level}\n\n${msg.text}`
                          )
                        }
                        className={`w-full py-1 rounded-lg border text-[9px] font-bold flex items-center justify-center gap-1 transition-colors ${
                          isDark
                            ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                            : 'border-slate-200 hover:bg-slate-100 text-[#0f2942]'
                        }`}
                      >
                        {copied === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar diagnóstico</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[8px] text-slate-400 mt-0.5 px-1">{msg.ts}</span>
              </div>
            ))}

          {typing && (
            <div className="flex items-center gap-2 text-slate-400 text-[10px] p-1.5">
              <Bot className="w-3 h-3 animate-spin text-blue-500" />
              <span className="italic">NAPI está analizando con IA en Render...</span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className={`p-2 border-t flex items-center gap-1.5 shrink-0 ${
            isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu propuesta..."
            className={`flex-1 px-3 py-1.5 rounded-xl text-xs border outline-none transition-colors ${
              isDark
                ? 'bg-[#131f33] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400'
                : 'bg-slate-50 border-slate-200 text-[#0f2942] placeholder-slate-400 focus:border-[#0f2942]'
            }`}
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            className="w-7 h-7 bg-[#0f2942] hover:bg-[#163a5c] disabled:opacity-50 text-white rounded-xl flex items-center justify-center shadow-xs shrink-0 transition-colors"
          >
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>
    </>
  );
};
