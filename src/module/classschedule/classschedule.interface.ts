export interface IClassSchedule {
    course_id: string;
    course_name: string;
    day: string;
    time: string;
    room: string;
    faculty: {
      name: string;
      email: string;
      phone: string;
      office: string;
    };
    assignments: {
      title: string;
      due_date: Date;
    }[];
    exam_schedule: {
      midterm: Date;
      final: Date;
    };
  }