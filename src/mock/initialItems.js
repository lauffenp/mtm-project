import img from '../img/pic.png'
import { LONG_TEXT_TYPE, WIDTH_WIDE, IMAGE_TYPE } from '../constants';
export const initialItems = [
  {
    title: 'image',
    image: img,
    field_type: IMAGE_TYPE
  },
  {
    title: 'occupation',
    data: 'Researcher',
    width: WIDTH_WIDE,
  },
  {
    title: 'nationality',
    data: 'French',
    width: WIDTH_WIDE,
  },
  {
    title: 'quote',
    field_type: LONG_TEXT_TYPE,
    width: WIDTH_WIDE,
    data: 'Something about life...'
  },
  {
    title: 'age',
    data: '28',
  },
  {
    title: 'gender',
    data: 'Not defined'
  }
];

export default initialItems;
