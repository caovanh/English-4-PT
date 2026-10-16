export interface PhrasebookItem {
  id: string;
  category: 'Welcoming' | 'Form Cues' | 'Motivation' | 'Numbers & Metrics' | 'Safety & Injuries' | 'Commercial & Services';
  english: string;
  vietnamese: string;
  ipa?: string;
  tag?: string;
}

export const PHRASEBOOK_CATEGORIES = [
  'All',
  'Form Cues',
  'Welcoming',
  'Motivation',
  'Numbers & Metrics',
  'Safety & Injuries',
  'Commercial & Services',
] as const;

export const PHRASEBOOK_DATA: PhrasebookItem[] = [
  // Form Cues
  {
    id: 'pb_fc1',
    category: 'Form Cues',
    english: 'Keep your chest up and shoulders back.',
    vietnamese: 'Giữ ngực mở cao và kéo vai ra sau.',
    tag: 'Squat / Deadlift',
  },
  {
    id: 'pb_fc2',
    category: 'Form Cues',
    english: 'Keep your knees slightly outward; don’t let them cave in.',
    vietnamese: 'Giữ đầu gối hơi mở ra ngoài; đừng để bị chụm gối.',
    tag: 'Squat',
  },
  {
    id: 'pb_fc3',
    category: 'Form Cues',
    english: 'Push your hips back as if sitting into a chair.',
    vietnamese: 'Đẩy hông ra sau như thể đang ngồi vào ghế.',
    tag: 'Hinge / Squat',
  },
  {
    id: 'pb_fc4',
    category: 'Form Cues',
    english: 'Don’t round your back; keep a neutral spine.',
    vietnamese: 'Đừng gù/cong lưng; giữ cột sống thẳng tự nhiên.',
    tag: 'Deadlift / Row',
  },
  {
    id: 'pb_fc5',
    category: 'Form Cues',
    english: 'Drive through your heels on the way up.',
    vietnamese: 'Dùng lực đạp từ gót chân khi đứng lên.',
    tag: 'Leg Press / Squat',
  },
  {
    id: 'pb_fc6',
    category: 'Form Cues',
    english: 'Inhale as you lower down, exhale as you drive up.',
    vietnamese: 'Hít vào khi hạ xuống, thở ra khi phát lực đẩy lên.',
    tag: 'Breathing',
  },
  {
    id: 'pb_fc7',
    category: 'Form Cues',
    english: 'Keep a soft bend in your elbows; do not lock out.',
    vietnamese: 'Giữ khuỷu tay hơi chùng nhẹ; đừng khóa cứng khớp.',
    tag: 'Pressing',
  },
  {
    id: 'pb_fc8',
    category: 'Form Cues',
    english: 'Pull your shoulder blades together at the top.',
    vietnamese: 'Ép chặt hai xương bả vai lại ở điểm gồng tối đa.',
    tag: 'Back / Rowing',
  },
  {
    id: 'pb_fc9',
    category: 'Form Cues',
    english: 'Slow it down on the way down; control the descent.',
    vietnamese: 'Làm chậm lại khi hạ tạ; kiểm soát nhịp hạ.',
    tag: 'Tempo',
  },
  {
    id: 'pb_fc10',
    category: 'Form Cues',
    english: 'Brace your abs like someone is about to punch you.',
    vietnamese: 'Gồng chặt cơ bụng như sắp có người đấm vào bụng.',
    tag: 'Core / Bracing',
  },

  // Welcoming
  {
    id: 'pb_w1',
    category: 'Welcoming',
    english: 'Hi, welcome to the gym! How are you doing today?',
    vietnamese: 'Chào bạn, chào mừng bạn đến phòng tập! Hôm nay bạn thế nào?',
    tag: 'Greeting',
  },
  {
    id: 'pb_w2',
    category: 'Welcoming',
    english: 'I’ll be your personal trainer today. My name is Coach Minh.',
    vietnamese: 'Tôi sẽ là HLV của bạn hôm nay. Tôi tên là Minh.',
    tag: 'Intro',
  },
  {
    id: 'pb_w3',
    category: 'Welcoming',
    english: 'Have you worked with a personal trainer before?',
    vietnamese: 'Trước đây bạn đã từng tập cùng HLV cá nhân chưa?',
    tag: 'Assessment',
  },
  {
    id: 'pb_w4',
    category: 'Welcoming',
    english: 'What is your primary fitness goal for the next three months?',
    vietnamese: 'Mục tiêu thể lực chính của bạn trong 3 tháng tới là gì?',
    tag: 'Goals',
  },
  {
    id: 'pb_w5',
    category: 'Welcoming',
    english: 'Feel free to ask questions or tell me if anything feels uncomfortable.',
    vietnamese: 'Cứ thoải mái hỏi hoặc báo tôi nếu có bất kỳ động tác nào thấy khó chịu nhé.',
    tag: 'Rapport',
  },

  // Motivation & Encouragement
  {
    id: 'pb_m1',
    category: 'Motivation',
    english: 'You’ve got this! Don’t give up now!',
    vietnamese: 'Bạn làm được mà! Đừng bỏ cuộc lúc này!',
    tag: 'Mid-Set',
  },
  {
    id: 'pb_m2',
    category: 'Motivation',
    english: 'Two more strong reps! Finish it out!',
    vietnamese: 'Hai cái dứt khoát nữa thôi! Hoàn thành xuất sắc nào!',
    tag: 'Finisher',
  },
  {
    id: 'pb_m3',
    category: 'Motivation',
    english: 'That was textbook form, absolutely spot on!',
    vietnamese: 'Kỹ thuật vừa rồi chuẩn như sách giáo khoa, cực kỳ chính xác!',
    tag: 'Praise',
  },
  {
    id: 'pb_m4',
    category: 'Motivation',
    english: 'Great energy today! Your consistency is really paying off.',
    vietnamese: 'Hôm nay năng lượng tuyệt vời! Sự kiên trì của bạn đang mang lại kết quả rõ rệt.',
    tag: 'Affirmation',
  },
  {
    id: 'pb_m5',
    category: 'Motivation',
    english: 'All you! Great fight on that last repetition!',
    vietnamese: 'Hoàn toàn là sức của bạn đấy! Nỗ lực tuyệt vời ở lần nâng cuối!',
    tag: 'Praise',
  },

  // Numbers & Metrics
  {
    id: 'pb_nm1',
    category: 'Numbers & Metrics',
    english: 'We are doing 3 sets of 10 to 12 reps with 60 seconds rest.',
    vietnamese: 'Chúng ta sẽ tập 3 hiệp, mỗi hiệp 10 đến 12 cái, nghỉ 60 giây.',
    tag: 'Volume',
  },
  {
    id: 'pb_nm2',
    category: 'Numbers & Metrics',
    english: 'Let’s increase the weight by 2.5 kg on each side.',
    vietnamese: 'Hãy tăng thêm 2.5 kg mỗi bên đòn tạ nhé.',
    tag: 'Load',
  },
  {
    id: 'pb_nm3',
    category: 'Numbers & Metrics',
    english: 'On an RPE scale from 1 to 10, how hard did that feel?',
    vietnamese: 'Trên thang điểm RPE từ 1 đến 10, bạn thấy nặng mức mấy?',
    tag: 'RPE',
  },
  {
    id: 'pb_nm4',
    category: 'Numbers & Metrics',
    english: 'Set the treadmill speed to 8.5 km/h and incline to 3 percent.',
    vietnamese: 'Cài tốc độ máy chạy 8.5 km/h và độ dốc 3% nhé.',
    tag: 'Cardio',
  },
  {
    id: 'pb_nm5',
    category: 'Numbers & Metrics',
    english: 'Your body fat percentage dropped by 2% on this month’s scan!',
    vietnamese: 'Tỷ lệ mỡ cơ thể của bạn đã giảm 2% trên bảng đo tháng này!',
    tag: 'InBody',
  },

  // Safety & Injuries
  {
    id: 'pb_si1',
    category: 'Safety & Injuries',
    english: 'Do you have any past injuries, surgeries, or joint issues?',
    vietnamese: 'Bạn có chấn thương cũ, phẫu thuật hay vấn đề khớp nào không?',
    tag: 'Screening',
  },
  {
    id: 'pb_si2',
    category: 'Safety & Injuries',
    english: 'Is that a muscular burn or a sharp joint pain?',
    vietnamese: 'Đó là cảm giác mỏi cơ hay đau nhói ở khớp?',
    tag: 'Pain Check',
  },
  {
    id: 'pb_si3',
    category: 'Safety & Injuries',
    english: 'If anything feels painful, stop immediately and let me know.',
    vietnamese: 'Nếu thấy đau ở đâu, hãy dừng lại ngay và báo cho tôi nhé.',
    tag: 'Safety Rule',
  },
  {
    id: 'pb_si4',
    category: 'Safety & Injuries',
    english: 'Always put the safety clips on the barbell before lifting.',
    vietnamese: 'Luôn kẹp chốt an toàn vào thanh đòn trước khi nâng tạ.',
    tag: 'Equipment',
  },
  {
    id: 'pb_si5',
    category: 'Safety & Injuries',
    english: 'Let’s sit down, drink some water, and catch your breath.',
    vietnamese: 'Hãy ngồi xuống, uống chút nước và hít thở sâu lấy lại sức nhé.',
    tag: 'Fatigue',
  },

  // Commercial & Services
  {
    id: 'pb_cs1',
    category: 'Commercial & Services',
    english: 'You can freeze your membership for up to 30 days while traveling.',
    vietnamese: 'Bạn có thể bảo lưu thẻ tập tối đa 30 ngày khi đi công tác/du lịch.',
    tag: 'Membership',
  },
  {
    id: 'pb_cs2',
    category: 'Commercial & Services',
    english: 'We offer packages of 12, 24, or 36 personal training sessions.',
    vietnamese: 'Chúng tôi cung cấp các gói 12, 24 hoặc 36 buổi tập với HLV cá nhân.',
    tag: 'Packages',
  },
  {
    id: 'pb_cs3',
    category: 'Commercial & Services',
    english: 'Please give at least 12 hours notice if you need to reschedule.',
    vietnamese: 'Vui lòng báo trước ít nhất 12 tiếng nếu bạn cần đổi lịch tập nhé.',
    tag: 'Policy',
  },
  {
    id: 'pb_cs4',
    category: 'Commercial & Services',
    english: 'Creatine and whey protein are great supplements to support your recovery.',
    vietnamese: 'Creatine và whey protein là những chất bổ sung tuyệt vời để hỗ trợ phục hồi.',
    tag: 'Supplements',
  },
];
