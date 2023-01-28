export const InlineGroup = (props) => {

    const { className, children } = props;

    return (
      <div
        className={`inline-group ${className}`}
      >
        {[children]}
      </div>
    );

};