interface TitleHeadProps {
  title: string;
  totalTasks: number;
  className: string;
}
export function TitleHead({ title, totalTasks, className}: TitleHeadProps) {
  return (
    <div className="flex ">
      <h4 className="font-semibold">{title}</h4>
      <span className={`rounded-full px-2 ml-2 ${className}`}>
        {totalTasks}
      </span>
    </div>
  );
}
