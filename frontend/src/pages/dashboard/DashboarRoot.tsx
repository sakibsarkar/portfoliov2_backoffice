import DashboardHeading from "@/components/UIelements/DashboardHeading";

const DashboarRoot = () => {
  return (
    <div>
      <DashboardHeading
        title="Portfolio Overview"
        description="Preview of current portfolio status"
      />
      <iframe
        src="https://nazmul-islam-sakib.vercel.app"
        className="w-full h-[90vh] border-[1px] border-input mt-[25px]"
      />
    </div>
  );
};

export default DashboarRoot;
