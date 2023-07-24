import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import PersonalTable from './PersonalTable';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function Staffs(props) {
  const { t } = useTranslation('examplePage');

  return (
    <Root
      header={
        <div className="p-24">
          <h4>Staffs</h4>
        </div>
      }
      content={
        <div className="p-24">
          <PersonalTable />
        </div>
      }
      scroll="content"
    />
  );
}

export default Staffs;
