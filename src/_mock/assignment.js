import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const COURSE_NAME = [
    "Math",
    "Pineapple",
    "IT Innovation",
    "English",
    "Music"
]
const ASSIGNMENT_NAME = [
    "assignment 1",
    "assignment 2",
    "group assignment 1",
    "group assignment 2",
    "final assignment"
]

// ----------------------------------------------------------------------

const assignments = [...Array(7)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: ASSIGNMENT_NAME[index],
  course: COURSE_NAME[1],
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'past',]),
  weight: sample(['30','35','15']),
  result: sample([
    '80%',
    '76%',
    '55%',
  ]),
}));

export default assignments;
