interface IBackDrop {
  sideDrawerVisibility: boolean;
  toggleSideDrawer: () => {};
}
export default function BackDrop({ sideDrawerVisibility, toggleSideDrawer }: IBackDrop) {
  return (
    <div
      onKeyPress={toggleSideDrawer}
      onClick={toggleSideDrawer}
      role="presentation"
      className={` ${sideDrawerVisibility ? "backdrop" : ""}`}
    />
  );
}
