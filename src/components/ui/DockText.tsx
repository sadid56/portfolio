const DockText = ({ text }: { text: string }) => {
  return (
    <h2 className="text-3xl md:text-6xl font-bold pointer-events-none whitespace-pre-wrap bg-linear-to-b bg-clip-text leading-none text-transparent from-white to-slate-900/10 text-center font-montserrat">
      {text}
    </h2>
  );
};

export default DockText;
