import Button from './Button';
import './ButtonDemo.scss';

const ButtonDemo = () => {
  const handleButtonClick = (variant) => {
    alert(`${variant} button clicked!`);
  };

  return (
    <div className="button-demo-container">
      <h2>Button Component Demo</h2>
      <p className="demo-description">
        This demo showcases the styled button component with primary and secondary variations.
        The button styling follows the requirements specified in the technical trial.
      </p>
      
      <div className="color-specs">
        <h3>Color Specifications</h3>
        <ul>
          <li><span className="color-box primary-border"></span> Primary border: #FF645D</li>
          <li><span className="color-box primary-bg"></span> Primary background: #FFDAC6</li>
          <li><span className="color-box secondary-border"></span> Secondary border: #dad2c6</li>
          <li><span className="color-box secondary-bg"></span> Secondary background: #FFF8EF</li>
          <li><span className="color-box text"></span> Text color: #000000</li>
        </ul>
      </div>
      
      <div className="buttons-grid">
        <div className="button-showcase">
          <h3>Primary Button</h3>
          <Button 
            variant="primary" 
            onClick={() => handleButtonClick('Primary')}
          >
            Primary Button
          </Button>
          <p className="button-description">Default state of the primary button.</p>
        </div>
        
        <div className="button-showcase">
          <h3>Primary Button (Hover)</h3>
          <div className="hover-demo primary">
            <Button variant="primary">Primary Button</Button>
          </div>
          <p className="button-description">Hover state uses the border color as background.</p>
        </div>
        
        <div className="button-showcase">
          <h3>Secondary Button</h3>
          <Button 
            variant="secondary" 
            onClick={() => handleButtonClick('Secondary')}
          >
            Secondary Button
          </Button>
          <p className="button-description">Default state of the secondary button.</p>
        </div>
        
        <div className="button-showcase">
          <h3>Secondary Button (Hover)</h3>
          <div className="hover-demo secondary">
            <Button variant="secondary">Secondary Button</Button>
          </div>
          <p className="button-description">Hover state uses the border color as background.</p>
        </div>
        
        <div className="button-showcase">
          <h3>Primary Submit Button</h3>
          <Button 
            variant="primary" 
            type="submit"
          >
            Submit
          </Button>
          <p className="button-description">Example of a submit button using the primary style.</p>
        </div>
        
        <div className="button-showcase">
          <h3>Disabled Secondary Button</h3>
          <Button 
            variant="secondary" 
            disabled
          >
            Disabled Button
          </Button>
          <p className="button-description">Example of a disabled button state.</p>
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;