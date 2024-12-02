import ActivityIndicator from './components/ActivityIndicator';

export const LoadingOverlay = () => (
    <div className="flex column centered align-items-center justify-content-center">
        <ActivityIndicator />
    </div>
);

export default LoadingOverlay;
