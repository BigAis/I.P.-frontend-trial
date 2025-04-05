import ButtonDemo from '../components/common/Button/ButtonDemo';

const ButtonDemoPage = () => {
  return (
    <div className="button-demo-page">
      <ButtonDemo />
      <div className="page-description">
        <h3>Task Details:</h3>
        <p>
          This component demonstrates a styled button created with SASS. The button has two
          variations (primary and secondary) and uses specific color codes as specified.
        </p>
        <p>
          The button uses the 'Inter' font family and implements hover states that change
          the background color to the border color.
        </p>
      </div>
    </div>
  );
};

export default ButtonDemoPage;