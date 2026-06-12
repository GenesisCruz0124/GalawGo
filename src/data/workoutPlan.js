// ===========================================================
// GalawGo - 7-Day Beginner Workout Program
//
// No equipment needed - just your bodyweight!
//
// Each day has a list of exercises. Every exercise has:
//   id          - unique id (used to track completion)
//   name        - exercise name
//   type        - 'time' (hold/move for a duration) or
//                  'reps' (count a number of repetitions)
//   sets        - how many sets to do
//   duration    - seconds per set (only for type: 'time')
//   reps        - repetitions per set (only for type: 'reps')
//   rest        - seconds to rest between sets
//   instructions- simple beginner-friendly how-to text
// ===========================================================

export const workoutPlan = [
  {
    day: 1,
    title: 'Full Body Basics',
    exercises: [
      {
        id: 'd1-jumping-jacks',
        name: 'Jumping Jacks',
        type: 'time',
        sets: 3,
        duration: 30,
        rest: 20,
        instructions:
          'Stand with feet together and arms at your sides. Jump while spreading your legs and raising your arms overhead, then jump back to the start. Keep a steady rhythm.',
      },
      {
        id: 'd1-squats',
        name: 'Bodyweight Squats',
        type: 'reps',
        sets: 3,
        reps: 12,
        rest: 30,
        instructions:
          'Stand with feet shoulder-width apart. Push your hips back and bend your knees like sitting in a chair, keeping your chest up. Push through your heels to stand back up.',
      },
      {
        id: 'd1-pushups',
        name: 'Push-Ups',
        type: 'reps',
        sets: 3,
        reps: 8,
        rest: 30,
        instructions:
          'Start in a plank position with hands under your shoulders. Lower your chest toward the floor by bending your elbows, then push back up. Drop to your knees if needed.',
      },
      {
        id: 'd1-plank',
        name: 'Plank',
        type: 'time',
        sets: 3,
        duration: 20,
        rest: 30,
        instructions:
          'Hold your body in a straight line from head to heels, resting on your forearms and toes (or knees if easier). Keep your core tight and avoid letting your hips sag.',
      },
    ],
  },
  {
    day: 2,
    title: 'Cardio Blast',
    exercises: [
      {
        id: 'd2-jumping-jacks',
        name: 'Jumping Jacks',
        type: 'time',
        sets: 4,
        duration: 30,
        rest: 15,
        instructions:
          'Stand with feet together and arms at your sides. Jump while spreading your legs and raising your arms overhead, then jump back to the start. Keep a steady rhythm.',
      },
      {
        id: 'd2-high-knees',
        name: 'High Knees',
        type: 'time',
        sets: 3,
        duration: 30,
        rest: 20,
        instructions:
          'Jog in place while driving your knees up toward your chest as fast as you comfortably can. Pump your arms to help keep your balance and rhythm.',
      },
      {
        id: 'd2-mountain-climbers',
        name: 'Mountain Climbers',
        type: 'time',
        sets: 3,
        duration: 20,
        rest: 30,
        instructions:
          'Start in a plank position. Quickly drive one knee toward your chest, then switch legs, like running in place while staying low to the ground.',
      },
      {
        id: 'd2-butt-kicks',
        name: 'Butt Kicks',
        type: 'time',
        sets: 3,
        duration: 30,
        rest: 20,
        instructions:
          'Jog in place while kicking your heels back to tap your glutes with each step. Keep your chest up and move at a comfortable, steady pace.',
      },
    ],
  },
  {
    day: 3,
    title: 'Lower Body Power',
    exercises: [
      {
        id: 'd3-squats',
        name: 'Bodyweight Squats',
        type: 'reps',
        sets: 4,
        reps: 15,
        rest: 30,
        instructions:
          'Stand with feet shoulder-width apart. Push your hips back and bend your knees like sitting in a chair, keeping your chest up. Push through your heels to stand back up.',
      },
      {
        id: 'd3-lunges',
        name: 'Forward Lunges',
        type: 'reps',
        sets: 3,
        reps: 10,
        rest: 30,
        instructions:
          'Step forward with one leg and lower your hips until both knees are bent at about 90 degrees. Push back to the starting position and repeat, alternating legs (count both legs as one rep).',
      },
      {
        id: 'd3-glute-bridges',
        name: 'Glute Bridges',
        type: 'reps',
        sets: 3,
        reps: 15,
        rest: 30,
        instructions:
          'Lie on your back with knees bent and feet flat on the floor. Squeeze your glutes to lift your hips toward the ceiling, then lower back down with control.',
      },
      {
        id: 'd3-wall-sit',
        name: 'Wall Sit',
        type: 'time',
        sets: 3,
        duration: 30,
        rest: 30,
        instructions:
          'Lean your back flat against a wall and slide down until your knees are bent at about 90 degrees, like sitting in an invisible chair. Hold the position.',
      },
    ],
  },
  {
    day: 4,
    title: 'Active Recovery & Stretch',
    exercises: [
      {
        id: 'd4-standing-stretch',
        name: 'Standing Side Stretch',
        type: 'time',
        sets: 2,
        duration: 30,
        rest: 10,
        instructions:
          'Stand tall and reach one arm overhead, gently leaning your body to the opposite side to stretch your torso. Switch sides each set.',
      },
      {
        id: 'd4-cat-cow',
        name: 'Cat-Cow Stretch',
        type: 'time',
        sets: 2,
        duration: 45,
        rest: 10,
        instructions:
          'Get on your hands and knees. Slowly arch your back up toward the ceiling (cat), then dip it down and lift your head (cow). Move slowly with your breathing.',
      },
      {
        id: 'd4-hamstring-stretch',
        name: 'Hamstring Stretch',
        type: 'time',
        sets: 2,
        duration: 30,
        rest: 10,
        instructions:
          'Sit down with one leg extended straight in front of you. Gently reach toward your toes, keeping your back straight, and hold the stretch. Switch legs each set.',
      },
      {
        id: 'd4-deep-breathing',
        name: 'Deep Breathing',
        type: 'time',
        sets: 1,
        duration: 60,
        rest: 0,
        instructions:
          'Sit or lie down comfortably. Breathe in slowly through your nose for 4 seconds, hold for 2 seconds, then breathe out through your mouth for 6 seconds. Repeat to help your body recover.',
      },
    ],
  },
  {
    day: 5,
    title: 'Upper Body & Core',
    exercises: [
      {
        id: 'd5-pushups',
        name: 'Push-Ups',
        type: 'reps',
        sets: 3,
        reps: 10,
        rest: 30,
        instructions:
          'Start in a plank position with hands under your shoulders. Lower your chest toward the floor by bending your elbows, then push back up. Drop to your knees if needed.',
      },
      {
        id: 'd5-plank',
        name: 'Plank',
        type: 'time',
        sets: 3,
        duration: 30,
        rest: 30,
        instructions:
          'Hold your body in a straight line from head to heels, resting on your forearms and toes (or knees if easier). Keep your core tight and avoid letting your hips sag.',
      },
      {
        id: 'd5-tricep-dips',
        name: 'Chair Tricep Dips',
        type: 'reps',
        sets: 3,
        reps: 10,
        rest: 30,
        instructions:
          'Sit on the edge of a sturdy chair with hands beside your hips. Slide your hips off the seat and lower your body by bending your elbows, then push back up.',
      },
      {
        id: 'd5-superman',
        name: 'Superman Hold',
        type: 'time',
        sets: 3,
        duration: 20,
        rest: 20,
        instructions:
          'Lie face down on the floor. Lift your arms, chest, and legs off the ground at the same time, squeezing your lower back and glutes. Hold, then lower with control.',
      },
    ],
  },
  {
    day: 6,
    title: 'Full Body HIIT',
    exercises: [
      {
        id: 'd6-jumping-jacks',
        name: 'Jumping Jacks',
        type: 'time',
        sets: 4,
        duration: 30,
        rest: 15,
        instructions:
          'Stand with feet together and arms at your sides. Jump while spreading your legs and raising your arms overhead, then jump back to the start. Keep a steady rhythm.',
      },
      {
        id: 'd6-squats',
        name: 'Bodyweight Squats',
        type: 'reps',
        sets: 3,
        reps: 15,
        rest: 20,
        instructions:
          'Stand with feet shoulder-width apart. Push your hips back and bend your knees like sitting in a chair, keeping your chest up. Push through your heels to stand back up.',
      },
      {
        id: 'd6-pushups',
        name: 'Push-Ups',
        type: 'reps',
        sets: 3,
        reps: 10,
        rest: 20,
        instructions:
          'Start in a plank position with hands under your shoulders. Lower your chest toward the floor by bending your elbows, then push back up. Drop to your knees if needed.',
      },
      {
        id: 'd6-burpees',
        name: 'Burpees',
        type: 'reps',
        sets: 3,
        reps: 8,
        rest: 30,
        instructions:
          'From standing, squat down and place your hands on the floor. Kick your feet back into a plank, then jump your feet back in and jump up with your arms overhead.',
      },
      {
        id: 'd6-plank',
        name: 'Plank',
        type: 'time',
        sets: 3,
        duration: 30,
        rest: 20,
        instructions:
          'Hold your body in a straight line from head to heels, resting on your forearms and toes (or knees if easier). Keep your core tight and avoid letting your hips sag.',
      },
    ],
  },
  {
    day: 7,
    title: 'Rest & Recharge',
    exercises: [
      {
        id: 'd7-full-body-stretch',
        name: 'Full Body Stretch',
        type: 'time',
        sets: 1,
        duration: 60,
        rest: 0,
        instructions:
          'Slowly stretch your neck, arms, back, and legs one at a time. Move gently and never stretch to the point of pain - this is about helping your muscles recover.',
      },
      {
        id: 'd7-deep-breathing',
        name: 'Deep Breathing',
        type: 'time',
        sets: 1,
        duration: 60,
        rest: 0,
        instructions:
          'Sit or lie down comfortably. Breathe in slowly through your nose for 4 seconds, hold for 2 seconds, then breathe out through your mouth for 6 seconds.',
      },
      {
        id: 'd7-light-walk',
        name: 'Light Walk or Mobility',
        type: 'time',
        sets: 1,
        duration: 300,
        rest: 0,
        instructions:
          'Take a relaxed walk, or move your joints through easy circles (ankles, hips, shoulders, neck). The goal today is light movement, not intensity. You earned it!',
      },
    ],
  },
];
