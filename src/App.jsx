import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Plus, X, Settings, GripVertical, Edit3, Upload, Printer, LogOut, User, Mail, Lock, Eye, EyeOff, Sparkles, AlertTriangle } from 'lucide-react';

// --- 로그인/회원가입 컴포넌트 분리 ---

const LoginPage = ({ loginForm, setLoginForm, handleLogin, setCurrentView, showPassword, setShowPassword }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User size={32} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">병원 스케줄 관리</h1>
                    <p className="text-gray-500 mt-2">로그인하여 스케줄을 확인하세요.</p>
                </div>
                <div className="space-y-4">
                    <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="email" placeholder="이메일" value={loginForm.email} onChange={e => setLoginForm(prev => ({ ...prev, email: e.target.value }))} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type={showPassword ? "text" : "password"} placeholder="비밀번호" value={loginForm.password} onChange={e => setLoginForm(prev => ({ ...prev, password: e.target.value }))} onKeyPress={handleKeyPress} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">로그인</button>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">계정이 없으신가요? <button onClick={() => setCurrentView('register')} className="font-semibold text-blue-500 hover:underline">회원가입</button></p>
                    <div className="mt-4 p-2 bg-gray-100 rounded-md text-xs text-gray-600">
                        테스트 계정: admin@hospital.com / admin123
                    </div>
                </div>
            </div>
        </div>
    );
};

const RegisterPage = ({ registerForm, setRegisterForm, handleRegister, setCurrentView }) => (
  <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus size={32} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">회원가입</h1>
        <p className="text-gray-500 mt-2">새 계정을 생성합니다.</p>
      </div>
      <div className="space-y-4">
          <input type="text" placeholder="이름" value={registerForm.name} onChange={e => setRegisterForm(prev => ({...prev, name: e.target.value}))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
          <input type="text" placeholder="병원명" value={registerForm.hospitalName} onChange={e => setRegisterForm(prev => ({...prev, hospitalName: e.target.value}))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
          <input type="email" placeholder="이메일" value={registerForm.email} onChange={e => setRegisterForm(prev => ({...prev, email: e.target.value}))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
          <input type="password" placeholder="비밀번호" value={registerForm.password} onChange={e => setRegisterForm(prev => ({...prev, password: e.target.value}))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
          <input type="password" placeholder="비밀번호 확인" value={registerForm.confirmPassword} onChange={e => setRegisterForm(prev => ({...prev, confirmPassword: e.target.value}))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
          <button onClick={handleRegister} className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">회원가입</button>
      </div>
      <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">이미 계정이 있으신가요? <button onClick={() => setCurrentView('login')} className="font-semibold text-green-500 hover:underline">로그인</button></p>
      </div>
    </div>
  </div>
);


const App = () => {
  // --- 상태 관리 (State Management) ---

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '', hospitalName: '' });

  const [accounts, setAccounts] = useState([{ email: 'admin@hospital.com', password: 'admin123', name: '관리자', hospitalName: '샘플 병원' }]);

  const [selectedTab, setSelectedTab] = useState('원장');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [scheduleData, setScheduleData] = useState({});
  const [holidayData, setHolidayData] = useState({});

  const [showPersonnelModal, setShowPersonnelModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showHospitalNameModal, setShowHospitalNameModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedRoomId, setDraggedRoomId] = useState(null);
  const [dragOverTarget, setDragOverTarget] = useState(null);
  const [draggedFromSchedule, setDraggedFromSchedule] = useState(null);
  const fileInputRef = useRef(null);

  const [hospitalInfo, setHospitalInfo] = useState({ name: '우리 병원', icon: null });
  const [tempHospitalName, setTempHospitalName] = useState('');

  const [directors, setDirectors] = useState([
    { id: 'dir1', abbrev: '김', name: '김원장' },
    { id: 'dir2', abbrev: '이', name: '이원장' },
    { id: 'dir3', abbrev: '박', name: '박원장' },
    { id: 'dir_none', abbrev: '無', name: '진료없음', isFixed: true },
  ]);

  const [staff, setStaff] = useState([
    { id: 'staff1', name: '천직원', isNew: false },
    { id: 'staff2', name: '방직원', isNew: false },
    { id: 'staff3', name: '지직원', isNew: true },
    { id: 'staff4', name: '황직원', isNew: false },
    { id: 'staff5', name: '강직원', isNew: true },
  ]);

  const [rooms, setRooms] = useState([
    { id: 'room1', name: '1진료실', hasTimeSlots: true, order: 1, allowNewStaffPairing: true },
    { id: 'room2', name: '2진료실', hasTimeSlots: true, order: 2, allowNewStaffPairing: false },
    { id: 'room3', name: '주사', hasTimeSlots: false, order: 3, allowNewStaffPairing: false },
    { id: 'room4', name: '수술', hasTimeSlots: false, order: 4, allowNewStaffPairing: false },
    { id: 'off', name: 'OFF', hasTimeSlots: false, order: 99, allowNewStaffPairing: false }
  ]);

  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonAbbrev, setNewPersonAbbrev] = useState('');
  const [isNewStaff, setIsNewStaff] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomHasTimeSlots, setNewRoomHasTimeSlots] = useState(true);
  const [newRoomAllowPairing, setNewRoomAllowPairing] = useState(false);

  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const kakaoScript = document.createElement('script');
    kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    kakaoScript.async = true;
    document.head.appendChild(kakaoScript);
    kakaoScript.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init('YOUR_KAKAO_JAVASCRIPT_KEY');
      }
    };

    const html2canvasScript = document.createElement('script');
    html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    html2canvasScript.async = true;
    document.head.appendChild(html2canvasScript);
  }, []);
  
  const API_KEY = 'YOUR_PUBLIC_DATA_API_KEY'; 
  const API_URL = 'https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo';

  const fetchHolidayData = async (year, month) => {
    if (API_KEY === 'YOUR_PUBLIC_DATA_API_KEY') {
      const defaultHolidays = { [`${year}-${month}`]: getDefaultHolidays(year, month) };
      setHolidayData(prev => ({ ...prev, ...defaultHolidays }));
      return;
    }
    try {
      const formattedMonth = month.toString().padStart(2, '0');
      const url = `${API_URL}?solYear=${year}&solMonth=${formattedMonth}&ServiceKey=${encodeURIComponent(API_KEY)}&_type=json&numOfRows=100`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.response?.header?.resultCode === '00' && data.response?.body?.items?.item) {
        const holidays = {};
        const items = Array.isArray(data.response.body.items.item) ? data.response.body.items.item : [data.response.body.items.item];
        items.forEach(item => {
          const key = `${year}-${month}`;
          if (!holidays[key]) holidays[key] = {};
          const day = parseInt(item.locdate.toString().substring(6, 8));
          holidays[key][day] = { name: item.dateName, isHoliday: item.isHoliday === 'Y' };
        });
        setHolidayData(prev => ({ ...prev, ...holidays }));
      } else {
         throw new Error('No holiday data found');
      }
    } catch (error) {
      console.error('공휴일 데이터 가져오기 실패:', error);
      const defaultHolidays = { [`${year}-${month}`]: getDefaultHolidays(year, month) };
      setHolidayData(prev => ({ ...prev, ...defaultHolidays }));
    }
  };

  const getDefaultHolidays = (year, month) => {
    const holidays = {};
    if (year === 2025) {
      switch (month) {
        case 1: holidays[1] = { name: '신정', isHoliday: true }; holidays[28] = { name: '설날 연휴', isHoliday: true }; holidays[29] = { name: '설날', isHoliday: true }; holidays[30] = { name: '설날 연휴', isHoliday: true }; break;
        case 3: holidays[1] = { name: '삼일절', isHoliday: true }; break;
        case 5: holidays[5] = { name: '어린이날', isHoliday: true }; holidays[6] = { name: '부처님오신날', isHoliday: true }; break;
        case 6: holidays[6] = { name: '현충일', isHoliday: true }; break;
        case 8: holidays[15] = { name: '광복절', isHoliday: true }; break;
        case 10: holidays[3] = { name: '개천절', isHoliday: true }; holidays[6] = { name: '추석', isHoliday: true }; holidays[7] = { name: '추석 연휴', isHoliday: true }; holidays[8] = { name: '추석 연휴', isHoliday: true }; holidays[9] = { name: '한글날', isHoliday: true }; break;
        case 12: holidays[25] = { name: '기독탄신일', isHoliday: true }; break;
        default: break;
      }
    }
    return holidays;
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      const today = new Date();
      setCurrentYear(today.getFullYear());
      setCurrentMonth(today.getMonth() + 1);
      setCurrentWeek(getTodayWeek(today));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchHolidayData(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  const getTodayWeek = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    const offset = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    return Math.ceil((date.getDate() + offset) / 7);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const isEditableDay = (targetDate) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return targetDate >= today;
  };

  const getWeekDays = (year, month, week) => {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    const offset = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);
    const startDate = new Date(year, month - 1, 1 + offset + (week - 1) * 7);
    const days = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const actualYear = currentDate.getFullYear();
        const actualMonth = currentDate.getMonth() + 1;
        const actualDay = currentDate.getDate();
        const holidayKey = `${actualYear}-${actualMonth}`;
        const holidayInfo = holidayData[holidayKey]?.[actualDay];
        days.push({
            date: `${actualMonth}월 ${actualDay}일(${['일', '월', '화', '수', '목', '금', '토'][currentDate.getDay()]})`,
            color: holidayInfo?.isHoliday ? 'bg-orange-50' : 'bg-blue-50',
            isHoliday: holidayInfo?.isHoliday || false,
            holidayName: holidayInfo?.name || null,
            actualDate: currentDate,
        });
    }
    return days;
  };

  const getWeekLabel = (year, month, week) => `${year}년 ${month}월 ${week}주차`;
  
  const sortKorean = (items, key = 'name') => [...items].sort((a, b) => a[key].localeCompare(b[key], 'ko'));

  const runAiGeneration = async (scheduleToProcess) => {
    setIsAiLoading(true);
    showNotification('✨ AI가 스케줄을 생성하고 있습니다...');

    const weekDays = getWeekDays(currentYear, currentMonth, currentWeek);
    const scheduleKey = `${currentYear}-${currentMonth}-${currentWeek}`;
    
    const offStaffByDay = {};
    weekDays.forEach(day => {
      offStaffByDay[day.date] = [];
      const offSchedule = scheduleToProcess[day.date]?.['OFF'];
      if (offSchedule?.people) {
        offSchedule.people.forEach(p => offStaffByDay[day.date].push(p.name));
      }
    });
    
    const prompt = `
      You are an expert hospital scheduler. Your task is to complete a weekly work schedule by assigning only the staff members. The directors have already been manually assigned.

      1. Personnel Information:
      - Existing Staff: ${staff.filter(s => !s.isNew).map(s => s.name).join(', ')}
      - New Staff: ${staff.filter(s => s.isNew).map(s => s.name).join(', ')}

      2. Current Schedule State (Directors are pre-assigned, some staff might be OFF):
      ${JSON.stringify(scheduleToProcess, null, 2)}

      3. Dates for this week:
      ${weekDays.map(d => `- ${d.date}${d.isHoliday ? ` (${d.holidayName}, Holiday)` : ''}`).join('\n')}

      4. Scheduling Rules for STAFF ONLY:
      - Your goal is to assign staff to work with the pre-assigned directors. DO NOT change the director assignments.
      - IMPORTANT: If a director is "진료없음", you MUST NOT assign any staff to that slot.
      - Distribute staff assignments as fairly and evenly as possible among all other directors throughout the week.
      - In rooms marked 'New staff pairing allowed' (${rooms.filter(r => r.allowNewStaffPairing).map(r=>r.name).join(', ')}), you MUST pair one new staff member with one existing staff member in each AM/PM slot.
      - New staff cannot work alone.
      - A staff member cannot be in multiple places at once on the same day.
      - Do not assign any staff to work on holidays.
      - Staff listed in 'OFF' for a specific day must NOT be assigned any other work on that day. For example: ${JSON.stringify(offStaffByDay)}
      - Fill in the staff for 'Injection' and 'Surgery' rooms as well, following the same fairness and pairing rules where applicable.
      - The final output must be a complete JSON object for the entire week's schedule, including the pre-assigned directors and the staff you assign. Strictly follow the provided JSON schema. Do not add any other text or explanations.
    `;

    const personSchema = { type: "OBJECT", properties: { id: { type: "STRING" }, name: { type: "STRING" }, abbrev: { type: "STRING", nullable: true }, isNew: { type: "BOOLEAN", nullable: true }, }, nullable: true, };
    const timeSlotSchema = { type: "OBJECT", properties: { director: personSchema, staff: { type: "ARRAY", items: personSchema }, }, };
    const roomProperties = {};
    weekDays.forEach(day => {
        const dayProperties = {};
        rooms.forEach(room => {
            if (room.hasTimeSlots) {
                dayProperties[room.name] = { type: "OBJECT", properties: { morning: timeSlotSchema, afternoon: timeSlotSchema, }, };
            } else {
                dayProperties[room.name] = { type: "OBJECT", properties: { people: { type: "ARRAY", items: personSchema, }, }, };
            }
        });
        roomProperties[day.date] = { type: "OBJECT", properties: dayProperties, };
    });
    const schema = { type: "OBJECT", properties: roomProperties, };
    
    try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        const payload = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json", responseSchema: schema, },
        };

        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

        if (!response.ok) {
            let errorBodyText = await response.text();
            let errorMessage = `API call failed with status: ${response.status}`;
            try {
                const errorBodyJson = JSON.parse(errorBodyText);
                errorMessage = errorBodyJson?.error?.message || errorMessage;
            } catch (parseError) { errorMessage = errorBodyText || errorMessage; }
            throw new Error(errorMessage);
        }

        const result = await response.json();
        
        if (!result.candidates || !result.candidates[0].content?.parts?.[0]?.text) {
            throw new Error("Invalid API response structure.");
        }

        const generatedJsonText = result.candidates[0].content.parts[0].text;
        const generatedSchedule = JSON.parse(generatedJsonText);
        
        setScheduleData(prev => ({ ...prev, [scheduleKey]: generatedSchedule }));
        showNotification('✅ AI 스케줄이 성공적으로 생성되었습니다!');

    } catch (error) {
        console.error("Gemini API Error:", error);
        setAiError({ title: 'AI 스케줄 생성 실패', message: `오류가 발생했습니다: ${error.message}` });
    } finally {
        setIsAiLoading(false);
    }
  };

  const handleGenerateClick = () => {
    const scheduleKey = `${currentYear}-${currentMonth}-${currentWeek}`;
    const currentSchedule = scheduleData[scheduleKey] || {};
    const weekDays = getWeekDays(currentYear, currentMonth, currentWeek);
    
    let isDirectorMissing = false;
    for (const day of weekDays) {
        if (day.isHoliday) continue;
        for (const room of rooms) {
            if (room.hasTimeSlots) {
                const daySchedule = currentSchedule[day.date]?.[room.name];
                if (!daySchedule?.morning?.director || !daySchedule?.afternoon?.director) {
                    isDirectorMissing = true;
                    break;
                }
            }
        }
        if (isDirectorMissing) break;
    }

    if (isDirectorMissing) {
        setShowConfirmModal(true);
    } else {
        runAiGeneration(currentSchedule);
    }
  };
  
  const handleConfirmAndGenerate = () => {
    const scheduleKey = `${currentYear}-${currentMonth}-${currentWeek}`;
    const newSchedule = JSON.parse(JSON.stringify(scheduleData[scheduleKey] || {}));
    const weekDays = getWeekDays(currentYear, currentMonth, currentWeek);
    const noTreatmentDirector = directors.find(d => d.id === 'dir_none');

    weekDays.forEach(day => {
        if (day.isHoliday) return;
        if (!newSchedule[day.date]) newSchedule[day.date] = {};
        rooms.forEach(room => {
            if (room.hasTimeSlots) {
                if (!newSchedule[day.date][room.name]) newSchedule[day.date][room.name] = {};
                if (!newSchedule[day.date][room.name].morning) newSchedule[day.date][room.name].morning = {};
                if (!newSchedule[day.date][room.name].afternoon) newSchedule[day.date][room.name].afternoon = {};

                if (!newSchedule[day.date][room.name].morning.director) {
                    newSchedule[day.date][room.name].morning.director = noTreatmentDirector;
                }
                if (!newSchedule[day.date][room.name].afternoon.director) {
                    newSchedule[day.date][room.name].afternoon.director = noTreatmentDirector;
                }
            }
        });
    });

    setScheduleData(prev => ({ ...prev, [scheduleKey]: newSchedule }));
    setShowConfirmModal(false);
    runAiGeneration(newSchedule);
  };
  
  const handleLogin = () => {
    const account = accounts.find(acc => acc.email === loginForm.email && acc.password === loginForm.password);
    if (account) {
      showNotification('로그인 성공!');
      setCurrentUser(account);
      setHospitalInfo(prev => ({ ...prev, name: account.hospitalName }));
      setIsAuthenticated(true);
      setCurrentView('schedule');
    } else {
      showNotification('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleRegister = () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      showNotification('비밀번호가 일치하지 않습니다.'); return;
    }
    if (accounts.some(acc => acc.email === registerForm.email)) {
      showNotification('이미 존재하는 이메일입니다.'); return;
    }
    const newAccount = { ...registerForm };
    setAccounts(prev => [...prev, newAccount]);
    setCurrentUser(newAccount);
    setHospitalInfo(prev => ({ ...prev, name: registerForm.hospitalName }));
    showNotification('회원가입이 완료되었습니다!');
    setIsAuthenticated(true);
    setCurrentView('schedule');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
    setCurrentUser(null);
    showNotification('로그아웃되었습니다.');
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setHospitalInfo(prev => ({ ...prev, icon: e.target.result }));
      reader.readAsDataURL(file);
      showNotification('아이콘이 업로드되었습니다.');
    } else {
      showNotification('이미지 파일만 업로드 가능합니다.');
    }
  };

  const saveHospitalName = () => {
    if (tempHospitalName.trim()) {
      setHospitalInfo(prev => ({ ...prev, name: tempHospitalName.trim() }));
      setShowHospitalNameModal(false);
      showNotification('병원명이 변경되었습니다.');
    }
  };

  const changeWeek = (direction) => {
    let newYear = currentYear;
    let newMonth = currentMonth;
    let newWeek = currentWeek;

    if (direction === 'prev') {
      newWeek--;
      if (newWeek < 1) {
        newMonth--;
        if (newMonth < 1) { newMonth = 12; newYear--; }
        newWeek = getTodayWeek(new Date(newYear, newMonth, 0));
      }
    } else {
      const totalWeeks = getTodayWeek(new Date(newYear, newMonth, 0));
      newWeek++;
      if (newWeek > totalWeeks) {
        newWeek = 1;
        newMonth++;
        if (newMonth > 12) { newMonth = 1; newYear++; }
      }
    }
    setCurrentYear(newYear);
    setCurrentMonth(newMonth);
    setCurrentWeek(newWeek);
  };

  const handlePrint = () => {
    const element = document.getElementById('schedule-table-to-print');
    if (!element || !window.html2canvas) { showNotification('이미지 렌더링 라이브러리를 로드하지 못했습니다.'); return; }
    window.html2canvas(element).then(canvas => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>인쇄</title><style>@media print { body { margin: 0; } img { max-width: 100%; height: auto; } }</style></head><body>');
        printWindow.document.write(`<img src="${canvas.toDataURL()}">`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => { printWindow.print(); printWindow.close(); }, 250);
    });
  };

  const saveAsPng = () => {
    const element = document.getElementById('schedule-table-to-print');
    if (!element || !window.html2canvas) { showNotification('이미지 렌더링 라이브러리를 로드하지 못했습니다.'); return; }
    showNotification('PNG 파일을 생성 중입니다...');
    window.html2canvas(element).then(canvas => {
        const link = document.createElement('a');
        link.download = `${hospitalInfo.name}_스케줄_${currentYear}-${currentMonth}-${currentWeek}주차.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showNotification('PNG 파일이 저장되었습니다.');
    });
  };

  const shareToKakao = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) { showNotification('카카오 SDK가 로딩되지 않았습니다. 잠시 후 다시 시도해주세요.'); return; }
    const element = document.getElementById('schedule-table-to-print');
    if (!element || !window.html2canvas) { showNotification('이미지 렌더링 라이브러리를 로드하지 못했습니다.'); return; }
    showNotification('공유 이미지를 생성 중입니다...');
    window.html2canvas(element).then(canvas => {
        canvas.toBlob(blob => {
            window.Kakao.Share.uploadImage({ file: [blob] })
            .then(response => {
                window.Kakao.Share.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: `${hospitalInfo.name} ${getWeekLabel(currentYear, currentMonth, currentWeek)}`,
                        description: '주간 스케줄을 확인하세요.',
                        imageUrl: response.infos.original.url,
                        link: { mobileWebUrl: window.location.href, webUrl: window.location.href },
                    },
                });
            }).catch(error => {
                console.error('Kakao image upload error:', error);
                showNotification('카카오 이미지 업로드에 실패했습니다.');
            });
        }, 'image/png');
    });
  };

  const handleDragStart = (e, item, from = null) => {
    setDraggedItem(item);
    setDraggedFromSchedule(from);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; };
  
  const handleDragOverWithHighlight = (e, day, room, timeSlot) => { e.preventDefault(); setDragOverTarget({ day, room, timeSlot }); };

  const handleDragLeave = () => setDragOverTarget(null);

  const removePersonFromSchedule = (day, room, timeSlot, personId) => {
    const scheduleKey = `${currentYear}-${currentMonth}-${currentWeek}`;
    setScheduleData(prev => {
        const newData = JSON.parse(JSON.stringify(prev));
        if (!newData[scheduleKey]?.[day]?.[room]) return prev;
        const roomData = newData[scheduleKey][day][room];
        if (roomData.people) {
            roomData.people = roomData.people.filter(p => p.id !== personId);
        } else if (roomData[timeSlot]) {
            if (roomData[timeSlot].director?.id === personId) roomData[timeSlot].director = null;
            if (Array.isArray(roomData[timeSlot].staff)) {
                roomData[timeSlot].staff = roomData[timeSlot].staff.filter(s => s.id !== personId);
            }
        }
        return newData;
    });
  };

  const handleDrop = (e, day, room, timeSlot, isFullDayDrop = false) => {
    e.preventDefault();
    setDragOverTarget(null);
    if (!draggedItem) return;

    const targetDate = getWeekDays(currentYear, currentMonth, currentWeek).find(d => d.date === day)?.actualDate;
    if (targetDate && !isEditableDay(targetDate)) {
        showNotification('과거 날짜는 수정할 수 없습니다.');
        return;
    }
    
    const scheduleKey = `${currentYear}-${currentMonth}-${currentWeek}`;
    const daySchedule = scheduleData[scheduleKey]?.[day] || {};

    if (draggedItem.abbrev) {
        for (const roomName in daySchedule) {
            if (roomName === room) continue;
            const roomData = daySchedule[roomName];
            if (roomData.morning?.director?.id === draggedItem.id || roomData.afternoon?.director?.id === draggedItem.id) {
                showNotification(`${draggedItem.name}은(는) 이미 다른 진료실에 배정되었습니다.`);
                return;
            }
        }
    }

    if (draggedFromSchedule) {
        removePersonFromSchedule(draggedFromSchedule.day, draggedFromSchedule.room, draggedFromSchedule.timeSlot, draggedItem.id);
    }
    
    setScheduleData(prev => {
        const newData = JSON.parse(JSON.stringify(prev));
        if (!newData[scheduleKey]) newData[scheduleKey] = {};
        if (!newData[scheduleKey][day]) newData[scheduleKey][day] = {};
        
        const updateSlot = (targetTimeSlot) => {
            if (!newData[scheduleKey][day][room]) newData[scheduleKey][day][room] = { morning: { director: null, staff: [] }, afternoon: { director: null, staff: [] } };
            if (!newData[scheduleKey][day][room][targetTimeSlot]) newData[scheduleKey][day][room][targetTimeSlot] = { director: null, staff: [] };
            const roomData = newData[scheduleKey][day][room];
            if (draggedItem.abbrev) {
                roomData[targetTimeSlot].director = draggedItem;
            } else {
                if (!Array.isArray(roomData[targetTimeSlot].staff)) roomData[targetTimeSlot].staff = [];
                if (!roomData[targetTimeSlot].staff.some(s => s.id === draggedItem.id)) {
                    roomData[targetTimeSlot].staff.push(draggedItem);
                }
            }
        };

        if (isFullDayDrop && draggedItem.abbrev) {
            updateSlot('morning');
            updateSlot('afternoon');
        } else if (timeSlot) {
            updateSlot(timeSlot);
        } else {
            if (!newData[scheduleKey][day][room]) newData[scheduleKey][day][room] = { people: [] };
            if (!newData[scheduleKey][day][room].people.some(p => p.id === draggedItem.id)) {
                newData[scheduleKey][day][room].people.push(draggedItem);
            }
        }
        return newData;
    });

    setDraggedItem(null);
    setDraggedFromSchedule(null);
  };

  const handleSidebarDrop = (e) => {
      e.preventDefault();
      if (draggedFromSchedule) {
          removePersonFromSchedule(draggedFromSchedule.day, draggedFromSchedule.room, draggedFromSchedule.timeSlot, draggedItem.id);
      }
      setDraggedItem(null);
      setDraggedFromSchedule(null);
  };

  const handleRoomDragStart = (e, roomId) => setDraggedRoomId(roomId);
  const handleRoomDrop = (e, targetRoomId) => {
    e.preventDefault();
    if (!draggedRoomId || draggedRoomId === targetRoomId) return;

    setRooms(prev => {
        const newRooms = [...prev];
        const draggedIndex = newRooms.findIndex(r => r.id === draggedRoomId);
        const targetIndex = newRooms.findIndex(r => r.id === targetRoomId);
        const [draggedRoom] = newRooms.splice(draggedIndex, 1);
        newRooms.splice(targetIndex, 0, draggedRoom);
        return newRooms.map((room, index) => ({ ...room, order: index }));
    });
    setDraggedRoomId(null);
  };

  const moveRoom = (roomId, direction) => {
    setRooms(prev => {
        const index = prev.findIndex(r => r.id === roomId);
        if (index === -1) return prev;
        const newRooms = [...prev];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newRooms.length) return prev;
        [newRooms[index], newRooms[targetIndex]] = [newRooms[targetIndex], newRooms[index]];
        return newRooms.map((room, i) => ({ ...room, order: i }));
    });
  };

  const Notification = () => notification && (
    <div className="fixed top-5 right-5 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 animate-fade-in-out">
      <p className="text-sm text-gray-800">{notification}</p>
    </div>
  );

  const AiErrorModal = ({ error, onClose }) => {
    if (!error) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{error.title}</h3>
                        <div className="mt-2"><p className="text-sm text-gray-500">{error.message}</p></div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>확인</button>
                </div>
            </div>
        </div>
    );
  };

  const ConfirmModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">원장 자동 배치</h3>
                    <div className="mt-2"><p className="text-sm text-gray-500">원장이 배정되지 않은 빈 진료가 있습니다. '진료없음'으로 자동 설정하고 스케줄을 생성할까요?</p></div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm" onClick={onConfirm}>예</button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm" onClick={onCancel}>아니오</button>
            </div>
        </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <>
        <Notification />
        {currentView === 'login' ? <LoginPage {...{ loginForm, setLoginForm, handleLogin, setCurrentView, showPassword, setShowPassword }} /> : <RegisterPage {...{ registerForm, setRegisterForm, handleRegister, setCurrentView }} />}
      </>
    );
  }

  const weekDays = getWeekDays(currentYear, currentMonth, currentWeek);
  const currentWeekData = scheduleData[`${currentYear}-${currentMonth}-${currentWeek}`] || {};
  const hasEditableDay = weekDays.some(day => isEditableDay(day.actualDate));
  const orderedRooms = [...rooms].sort((a, b) => a.order - b.order).filter(r => r.name !== 'OFF');

  return (
    <div className="min-h-screen bg-gray-50">
      <Notification />
      <AiErrorModal error={aiError} onClose={() => setAiError(null)} />
      {showConfirmModal && <ConfirmModal onConfirm={handleConfirmAndGenerate} onCancel={() => setShowConfirmModal(false)} />}
      
      <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-4">
          <button onClick={() => fileInputRef.current?.click()} className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center border hover:border-blue-400">
            {hospitalInfo.icon ? <img src={hospitalInfo.icon} alt="Icon" className="w-full h-full object-cover rounded-lg" /> : <Upload size={20} className="text-blue-600" />}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleIconUpload} className="hidden" />
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            {hospitalInfo.name}
            <button onClick={() => { setTempHospitalName(hospitalInfo.name); setShowHospitalNameModal(true); }} className="p-1 hover:bg-gray-200 rounded-full"><Edit3 size={16} className="text-gray-600" /></button>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowPersonnelModal(true)} className="text-sm text-gray-600 hover:text-blue-600">인원 관리</button>
          <button onClick={() => setShowSettingsModal(true)} className="text-sm text-gray-600 hover:text-blue-600">진료실 설정</button>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700"><LogOut size={16} /> 로그아웃</button>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white p-4 border-r" onDragOver={handleDragOver} onDrop={handleSidebarDrop}>
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button onClick={() => setSelectedTab('원장')} className={`flex-1 py-2 text-sm rounded-md transition-colors ${selectedTab === '원장' ? 'bg-blue-500 text-white shadow' : 'text-gray-600'}`}>원장</button>
            <button onClick={() => setSelectedTab('직원')} className={`flex-1 py-2 text-sm rounded-md transition-colors ${selectedTab === '직원' ? 'bg-green-500 text-white shadow' : 'text-gray-600'}`}>직원</button>
          </div>
          <div className="space-y-2">
            {(selectedTab === '원장' ? sortKorean(directors, 'name') : sortKorean(staff, 'name')).map(person => (
              <div key={person.id} draggable={hasEditableDay} onDragStart={(e) => handleDragStart(e, person)}
                className={`p-3 rounded-lg flex items-center gap-3 text-sm border ${!hasEditableDay ? 'opacity-50 cursor-not-allowed' : 'cursor-move hover:shadow-md'}
                  ${selectedTab === '원장' ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'}`}>
                {person.abbrev && <span className="font-bold bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">{person.abbrev}</span>}
                <span>{person.name}</span>
                {person.isNew && <span className="ml-auto w-5 h-5 bg-yellow-400 text-white text-xs font-bold flex items-center justify-center rounded-full">N</span>}
              </div>
            ))}
          </div>
          {!hasEditableDay && <p className="text-xs text-center mt-4 text-red-500 bg-red-50 p-2 rounded-md">과거 날짜는 수정할 수 없습니다.</p>}
        </aside>

        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => changeWeek('prev')} className="p-2 border rounded-md bg-white hover:bg-gray-100"><ChevronLeft size={20} /></button>
            <h2 className="text-lg font-semibold text-gray-800 bg-white px-6 py-2 rounded-md border min-w-[200px] text-center">{getWeekLabel(currentYear, currentMonth, currentWeek)}</h2>
            <button onClick={() => changeWeek('next')} className="p-2 border rounded-md bg-white hover:bg-gray-100"><ChevronRight size={20} /></button>
            <button onClick={handleGenerateClick} disabled={isAiLoading} className="ml-4 p-2 border rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm">
                {isAiLoading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>생성 중...</> : <><Sparkles size={16} /> ✨ AI 스케줄 자동 생성</>}
            </button>
            <button onClick={() => setShowShareModal(true)} className="ml-auto p-2 border rounded-md bg-white hover:bg-gray-100 flex items-center gap-2 text-sm"><Printer size={16} /> 공유/인쇄</button>
          </div>

          <div id="schedule-table-to-print" className="bg-white rounded-lg shadow-md border overflow-hidden">
            <div className="grid grid-cols-8">
              <div className="bg-gray-600 text-white p-3 text-center font-bold border-r">구분</div>
              {weekDays.map((day, i) => (<div key={i} className={`p-3 text-center text-sm font-semibold border-r ${day.color} ${day.isHoliday ? 'text-red-600' : 'text-gray-700'}`}>{day.date}</div>))}
            </div>
            {[...orderedRooms, rooms.find(r => r.name === 'OFF')].map(room => room && (
              <div key={room.id} className="grid grid-cols-8 border-t">
                <div className="bg-gray-600 text-white p-3 text-center font-bold border-r">{room.name}</div>
                {weekDays.map((day, i) => {
                  const daySchedule = currentWeekData[day.date]?.[room.name];
                  const isEditable = isEditableDay(day.actualDate);
                  if (day.isHoliday) return <div key={i} className="bg-red-100 flex items-center justify-center text-red-700 text-sm font-semibold border-r">{day.holidayName || '공휴일'}</div>;
                  
                  if (!room.hasTimeSlots) {
                      const isHighlighted = dragOverTarget?.day === day.date && dragOverTarget?.room === room.name;
                      return (
                          <div key={i} onDragOver={isEditable ? (e) => handleDragOverWithHighlight(e, day.date, room.name, null) : null} onDragLeave={handleDragLeave} onDrop={isEditable ? (e) => handleDrop(e, day.date, room.name, null) : null}
                              className={`p-2 border-r min-h-[60px] space-y-1 ${isEditable ? 'hover:bg-gray-100' : 'bg-gray-50'} ${isHighlighted ? 'ring-2 ring-blue-500' : ''}`}>
                              {(daySchedule?.people || []).map(p => (
                                  <div key={p.id} draggable={isEditable} onDragStart={isEditable ? (e) => handleDragStart(e, p, { day: day.date, room: room.name, timeSlot: null }) : null}
                                      className={`relative group text-xs p-1 rounded-md text-center ${p.abbrev ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} ${isEditable ? 'cursor-move' : ''}`}>
                                      {p.abbrev || p.name}
                                      {isEditable && <button onClick={() => removePersonFromSchedule(day.date, room.name, null, p.id)} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs">x</button>}
                                  </div>
                              ))}
                          </div>
                      );
                  }

                  return (
                    <div key={i} className="p-2 border-r space-y-2 min-h-[60px]" onDragOver={isEditable ? (e) => handleDragOver(e) : null} onDrop={isEditable ? (e) => handleDrop(e, day.date, room.name, null, true) : null}>
                      {['morning', 'afternoon'].map(timeSlot => {
                          const slotData = daySchedule?.[timeSlot];
                          const isHighlighted = dragOverTarget?.day === day.date && dragOverTarget?.room === room.name && dragOverTarget?.timeSlot === timeSlot;
                          return (
                              <div key={timeSlot} onDragOver={isEditable ? (e) => { e.stopPropagation(); handleDragOverWithHighlight(e, day.date, room.name, timeSlot); } : null} onDragLeave={handleDragLeave} onDrop={isEditable ? (e) => { e.stopPropagation(); handleDrop(e, day.date, room.name, timeSlot); } : null}
                                  className={`p-2 rounded-md border-2 border-dashed min-h-[40px] ${isEditable ? 'hover:border-blue-400' : 'border-gray-200 bg-gray-50'} ${isHighlighted ? 'ring-2 ring-blue-500' : ''}
                                      ${timeSlot === 'morning' ? 'border-yellow-300' : 'border-indigo-300'}`}>
                                  <div className="text-xs text-gray-500">{timeSlot === 'morning' ? '오전' : '오후'}</div>
                                  <div className="flex gap-1 flex-wrap mt-1">
                                      {slotData?.director && 
                                        <div draggable={isEditable} onDragStart={isEditable ? (e) => handleDragStart(e, slotData.director, { day: day.date, room: room.name, timeSlot }) : null} className={`relative group text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 ${isEditable ? 'cursor-move' : ''}`}>
                                            {slotData.director.abbrev}
                                            {isEditable && <button onClick={() => removePersonFromSchedule(day.date, room.name, timeSlot, slotData.director.id)} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs">x</button>}
                                        </div>
                                      }
                                      {(slotData?.staff || []).map(s => (
                                        <div key={s.id} draggable={isEditable} onDragStart={isEditable ? (e) => handleDragStart(e, s, { day: day.date, room: room.name, timeSlot }) : null} className={`relative group text-xs px-2 py-1 rounded-full flex items-center gap-1 ${s.isNew ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'} ${isEditable ? 'cursor-move' : ''}`}>
                                            {s.name}
                                            {s.isNew && <span className="w-3 h-3 text-white bg-yellow-500 text-[8px] font-bold flex items-center justify-center rounded-full">N</span>}
                                            {isEditable && <button onClick={() => removePersonFromSchedule(day.date, room.name, timeSlot, s.id)} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs">x</button>}
                                        </div>
                                      ))}
                                  </div>
                              </div>
                          );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </main>
      </div>

      {showPersonnelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">인원 관리</h3><button onClick={() => setShowPersonnelModal(false)}><X size={20} /></button></div>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h4 className="font-semibold mb-2">새 인원 추가</h4>
                <div className="flex gap-2 mb-2">
                    <input value={newPersonAbbrev} onChange={e => setNewPersonAbbrev(e.target.value)} placeholder="약어 (원장용)" className="w-20 border px-2 py-1 rounded-md" />
                    <input value={newPersonName} onChange={e => setNewPersonName(e.target.value)} placeholder="이름" className="flex-1 border px-2 py-1 rounded-md" />
                </div>
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isNewStaff} onChange={e => setIsNewStaff(e.target.checked)} />신규 직원</label>
                    <div className="flex gap-2">
                        <button onClick={() => { if(newPersonName && newPersonAbbrev) { setDirectors(prev => sortKorean([...prev, {id: `d${Date.now()}`, name: newPersonName, abbrev: newPersonAbbrev}])); setNewPersonAbbrev(''); setNewPersonName(''); } }} className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">원장 추가</button>
                        <button onClick={() => { if(newPersonName) { setStaff(prev => sortKorean([...prev, {id: `s${Date.now()}`, name: newPersonName, isNew: isNewStaff}])); setNewPersonName(''); setIsNewStaff(false); } }} className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">직원 추가</button>
                    </div>
                </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">원장 목록</h4>
              {sortKorean(directors, 'name').map(d => <div key={d.id} className="flex justify-between items-center p-2 bg-blue-50 rounded-md mb-1"><span className="text-sm">{d.name} ({d.abbrev})</span>{!d.isFixed && <button onClick={() => setDirectors(prev => prev.filter(p => p.id !== d.id))} className="text-red-500"><X size={16} /></button>}</div>)}
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">직원 목록</h4>
              {sortKorean(staff, 'name').map(s => <div key={s.id} className="flex justify-between items-center p-2 bg-green-50 rounded-md mb-1">
                <div className="flex items-center gap-2"><span className="text-sm">{s.name}</span>{s.isNew && <span className="w-5 h-5 bg-yellow-400 text-white text-xs font-bold flex items-center justify-center rounded-full">N</span>}</div>
                <button onClick={() => setStaff(prev => prev.filter(p => p.id !== s.id))} className="text-red-500"><X size={16} /></button>
              </div>)}
            </div>
          </div>
        </div>
      )}
      
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">진료실 설정</h3><button onClick={() => setShowSettingsModal(false)}><X size={20} /></button></div>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h4 className="font-semibold mb-2">새 진료실 추가</h4>
                <input value={newRoomName} onChange={e => setNewRoomName(e.target.value)} placeholder="진료실명" className="w-full border px-2 py-1 rounded-md mb-2" />
                <div className="flex items-center gap-4 mb-2 text-sm">
                    <label><input type="radio" name="slotType" checked={newRoomHasTimeSlots} onChange={() => setNewRoomHasTimeSlots(true)} /> 오전/오후 구분</label>
                    <label><input type="radio" name="slotType" checked={!newRoomHasTimeSlots} onChange={() => setNewRoomHasTimeSlots(false)} /> 단일</label>
                </div>
                <div className="flex items-center gap-4 mb-2 text-sm">
                    <label><input type="checkbox" checked={newRoomAllowPairing} onChange={e => setNewRoomAllowPairing(e.target.checked)} /> 신규 직원 페어링</label>
                </div>
                <button onClick={() => { if(newRoomName) { setRooms(prev => [...prev, {id: `r${Date.now()}`, name: newRoomName, hasTimeSlots: newRoomHasTimeSlots, allowNewStaffPairing: newRoomAllowPairing, order: prev.length}]); setNewRoomName(''); setNewRoomAllowPairing(false); } }} className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">추가</button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">진료실 목록 (드래그하여 순서 변경)</h4>
              {rooms.map((r, index) => (
                  <div key={r.id} draggable={r.name !== 'OFF'} onDragStart={r.name !== 'OFF' ? e => handleRoomDragStart(e, r.id) : null} onDragOver={handleDragOver} onDrop={r.name !== 'OFF' ? e => handleRoomDrop(e, r.id) : null}
                       className={`flex justify-between items-center p-2 rounded-md mb-1 border ${r.name === 'OFF' ? 'bg-gray-200' : 'bg-white cursor-move'}`}>
                      <div className="flex items-center gap-2">
                          <GripVertical size={16} className="text-gray-400" />
                          <span className="text-sm">{r.name}</span>
                          <span className="text-xs text-gray-500">({r.hasTimeSlots ? '오전/오후' : '단일'})</span>
                          {r.allowNewStaffPairing && <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">페어링</span>}
                      </div>
                      <div className="flex items-center gap-2">
                          {r.name !== 'OFF' && <button onClick={() => moveRoom(r.id, 'up')} disabled={index === 0} className="disabled:opacity-20"><ChevronUp size={16} /></button>}
                          {r.name !== 'OFF' && <button onClick={() => moveRoom(r.id, 'down')} disabled={index >= rooms.length - 2} className="disabled:opacity-20"><ChevronDown size={16} /></button>}
                          {r.name !== 'OFF' && <button onClick={() => setRooms(prev => prev.filter(room => room.id !== r.id))} className="text-red-500"><X size={16} /></button>}
                      </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showHospitalNameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">병원명 변경</h3>
            <input type="text" value={tempHospitalName} onChange={e => setTempHospitalName(e.target.value)} className="w-full border px-3 py-2 rounded-md mb-4" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowHospitalNameModal(false)} className="px-4 py-2 bg-gray-200 rounded-md text-sm">취소</button>
              <button onClick={saveHospitalName} className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm">저장</button>
            </div>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">공유 및 인쇄</h3><button onClick={() => setShowShareModal(false)}><X size={20} /></button></div>
            <div className="space-y-3">
                <button onClick={saveAsPng} className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2">PNG로 저장</button>
                <button onClick={shareToKakao} className="w-full p-3 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2">카카오톡으로 공유</button>
                <button onClick={handlePrint} className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"><Printer size={18} /> 인쇄하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;