import React, { useState } from 'react';
import feather from 'feather-icons';

const IconPicker = ({
  rowsInOnePage,
  columnsInOnePage,
  iconHeight,
  iconWidth,
  pickerHeight = 500,
  pickerWidth = 500,
  icons,
  onSelectIcon,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const iconsPerPage = rowsInOnePage * columnsInOnePage;
  const totalPages = Math.ceil(icons.length / iconsPerPage);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const handleDone = () => {
    onSelectIcon(selectedIcon);
    onClose();
  };

  const renderIcons = () => {
    const start = currentPage * iconsPerPage;
    const end = start + iconsPerPage;
    return icons.slice(start, end).map((icon, index) => (
      <div
        key={index}
        className={`cursor-pointer flex justify-center items-center relative ${selectedIcon === icon ? 'border-2 border-blue-700' : ''}`}
        style={{ width: `${iconWidth}px`, height: `${iconHeight}px` }}
        onClick={() => handleIconClick(icon)}
      >
        <div dangerouslySetInnerHTML={{ __html: feather.icons[icon].toSvg({ width: iconWidth, height: iconHeight }) }} />
        {selectedIcon === icon && (
          <div className="absolute inset-0 flex justify-center items-center">
            <span dangerouslySetInnerHTML={{ __html: feather.icons['check'].toSvg({ width: 24, height: 24 }) }} />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-3xl" style={{ height: `${pickerHeight}px`, width: `${pickerWidth}px` }}>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Select App Icon</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span dangerouslySetInnerHTML={{ __html: feather.icons['x'].toSvg({ width: 24, height: 24 }) }} />
          </button>
        </div>
        <div className="flex gap-4 justify-center items-center mb-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="disabled:opacity-20"
          >
            <span dangerouslySetInnerHTML={{ __html: feather.icons['arrow-left'].toSvg({ width: 24, height: 24 }) }} />
          </button>
          <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="disabled:opacity-50"
          >
            <span dangerouslySetInnerHTML={{ __html: feather.icons['arrow-right'].toSvg({ width: 24, height: 24 }) }} />
          </button>
        </div>
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columnsInOnePage}, minmax(${iconWidth}px, 1fr))`, gridTemplateRows: `repeat(${rowsInOnePage}, ${iconHeight}px)` }}>
          {renderIcons()}
        </div>
        <div className="border-t pt-2 mt-4">
          <div className="flex justify-end space-x-4">
            <button onClick={onClose} className="px-4 py-2 bg-slate-400 text-white rounded">Cancel</button>
            <button onClick={handleDone} className="px-4 py-2 bg-blue-500 text-white rounded">Done</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const IconPickerTrigger = ({ icons }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleOpenPicker = () => {
    setIsPickerOpen(true);
  };

  const handleClosePicker = () => {
    setIsPickerOpen(false);
  };

  const handleSelectIcon = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="border flex justify-center items-center cursor-pointer bg-blue-700 text-white rounded-lg w-24 h-24"
        onClick={handleOpenPicker}
      >
        {selectedIcon ? <div dangerouslySetInnerHTML={{ __html: feather.icons[selectedIcon].toSvg({ width: 100, height: 100 }) }} /> : 'Click Me'}
      </div>
      {isPickerOpen && (
        <IconPicker
          rowsInOnePage={5}
          columnsInOnePage={5}
          iconHeight={50}
          iconWidth={50}
          icons={Object.keys(feather.icons)}
          onSelectIcon={handleSelectIcon}
          onClose={handleClosePicker}
        />
      )}
    </div>
  );
};


export default function App(){
  return(
    <>
    <div className="App">
      <IconPickerTrigger />
    </div>
    </>
  )
}
