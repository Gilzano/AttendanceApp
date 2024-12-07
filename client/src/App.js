import React from 'react';
import axios from 'axios';

function App() {
  const [lecture, setLecture] = React.useState({
    title: '',
    date: '',
    startTime: '',
    endTime: ''
  });

  const createLecture = async () => {
    try {
      const response = await axios.post('http://localhost:3001/lectures', lecture);
      console.log('QR Code:', response.data.qrCode);
    } catch (error) {
      console.error('שגיאה ביצירת הרצאה', error);
    }
  };

  return (
    <div>
      <input 
        placeholder="כותרת הרצאה" 
        value={lecture.title}
        onChange={(e) => setLecture({...lecture, title: e.target.value})}
      />
      <input 
        type="date" 
        value={lecture.date}
        onChange={(e) => setLecture({...lecture, date: e.target.value})}
      />
      <input 
        type="time" 
        value={lecture.startTime}
        onChange={(e) => setLecture({...lecture, startTime: e.target.value})}
      />
      <input 
        type="time" 
        value={lecture.endTime}
        onChange={(e) => setLecture({...lecture, endTime: e.target.value})}
      />
      <button onClick={createLecture}>צור הרצאה</button>
    </div>
  );
}

export default App;