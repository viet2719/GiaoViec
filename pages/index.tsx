import styles from '@/styles/Home.module.css';
import HomeCty from './quan-ly-chung-cong-ty';

export default function App({ isHasRole }: { isHasRole: boolean }) {
  return <HomeCty isHasRole={isHasRole} />;
}
