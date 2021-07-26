import styles from './AddEventContent.module.css';
import { GeneralInformation } from './GeneralInformation';

export const AddEventContent: React.FC = () => {
    return (
        <div className={styles.content}>
            <GeneralInformation />
        </div>
    );
};
