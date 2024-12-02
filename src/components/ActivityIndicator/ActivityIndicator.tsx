import { ReactComponent as IMG } from '../../assets/images/logos/logoonly.svg';
import './ActivityIndicator.scss';

export interface IActivityIndicatorProps {}

export const ActivityIndicator = (props: IActivityIndicatorProps) => {
    return <IMG className="activity-indicator" height="32" width="32" />;
    // return <img className="activity-indicator" src={IMG} height="32" width="32" alt="activity indicator" />;
};

export default ActivityIndicator;
