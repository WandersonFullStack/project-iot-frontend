import { useState, useEffect } from "react";
import { 
    Plus, 
    GalleryVerticalEnd, 
    Cpu, 
    ChevronUp, 
    PanelLeft
} from "lucide-react";

import { plcService } from "../../services/plcService";
import { deviceService } from "../../services/deviceService";
import { DeviceOut, PLCOut } from "../../types";

import { useAuth } from "../../contexts/index";
import { 
    Header, 
    CreateDevice,
    DeviceFull, 
    AllDevices, 
    Plc,
    CreatePlc,
    FormModal
} from "../index";

import { 
    PageWrapper, 
    Content, 
    Menu, 
    Main,
    List,
    MenuTitle,
    NavLink,
    InsertMenu
} from "./styles";

type Props = {
    children?: React.ReactNode;
};

type ActiveView = "devices" | "plc" | "create-device" | "create-plc" | "device-full";

export function Dashboard({children}: Props)  {

    const { user, logout } = useAuth();

    const [ listPlcs, setListPlcs ] = useState<PLCOut[]>([]);
    const [ loadListPlc, setLoadListPlc ] = useState(false);
    const [ listPlcRefresh, setListPlcRefresh ] = useState(0);
    const [ menuOpen, setMenuOpen ] = useState(true);
    const [ activeView, setActiveView ] = useState<ActiveView>("devices");
    const [ plcId, setPlcId ] = useState<number | null>(null);
    const [ deviceById, setDeviceById ] = useState<string | null>(null);
    const [ deviceList, setDeviceList ] = useState<DeviceOut[]>([]);
    const [ listDeviceRefresh, setListDeviceRefresh ] = useState(0);
    const [ loadListDevice, setLoadListDevice ] = useState(false);

    useEffect(() => { 
        async function fetchListPlc () {
            try {
                const response = await plcService.list();
                setListPlcs(response);
            } catch {
                setListPlcs([]);
            }
        };
        fetchListPlc();
    }, [listPlcRefresh]);

    useEffect(() => {
        async function fetchListDevice () {
            try {
                const response = await deviceService.list();
                setDeviceList(response);
            } catch {
                setDeviceList([]);
            }
        };
        fetchListDevice();
    }, [listDeviceRefresh]);

    const handlePlc = (id: number) => {
        setPlcId(id);
        setActiveView("plc");
    };

    const handleCloseMenu = () => {
        setMenuOpen(false);
    };

    const handleInsertMenu = () => {
        setMenuOpen(true);
    };

    const handleAllDevices = () => {
        setActiveView("devices");
    };

    const handleListPlcs = () => {
        setLoadListPlc(true);
        setListPlcRefresh(r => r + 1);
    };

    const handleListPlcsClose = () => {
        setLoadListPlc(false);
    };

    const handleNewPlc = () => {
        setActiveView('create-plc');
    };

    const handleNewDevice = () => {
        setActiveView('create-device');
    };

    const handleDevice = (id: string) => {
        setDeviceById(id);
        setActiveView("device-full");
    };

    const handleListDvices = () => {
        setLoadListDevice(true);
        setListDeviceRefresh(r => r + 1);
    };

    const handleListDvicesClose = () => {
        setLoadListDevice(false);
    };

    return (
        <PageWrapper>
            
            <Main >
                {menuOpen ? (
                    <Header user={user} onLogout={logout} >
                        <Menu>
                            <MenuTitle>
                                <h3> Menu </h3>
                                <button className="close-menu-button" onClick={handleCloseMenu}>
                                    <PanelLeft size={20} strokeWidth={2.5}/>
                                </button>
                            </MenuTitle>
                            
                            <div className="nav-section">
                                <NavLink className="menu-link" onClick={handleNewDevice} >
                                    <Plus size={16} /> 
                                    New Device 
                                </NavLink>
                                <NavLink className="menu-link" onClick={() => {handleAllDevices(); handleListDvices();}}>
                                    <GalleryVerticalEnd size={16} />
                                    Devices
                                </NavLink>
                                <>
                                    {loadListDevice && (
                                        <List>
                                            {children}
                                            {deviceList.map((device) => (
                                                <a 
                                                    className="itrem-link"
                                                    key={device.device_id}
                                                    onClick={() => handleDevice(device.device_id)}
                                                >
                                                    {device.name}
                                                </a>
                                            ))}
                                            <div className="actions-list">
                                                <button className="close-button" onClick={handleNewDevice}>
                                                    <Plus size={18}/>
                                                </button>

                                                <button className="close-button" onClick={handleListDvicesClose}>
                                                    <ChevronUp size={16}/>
                                                </button>
                                            </div>
                                        </List>
                                    )}
                                </>
                                <NavLink  onClick={handleListPlcs}>
                                    <Cpu size={16}/>
                                    PLCs
                                </NavLink>
                                <>
                                    {loadListPlc && (
                                        <List >
                                            {children}
                                            {listPlcs.map((plc) => (
                                                <a 
                                                    className="itrem-link" 
                                                    key={plc.id} 
                                                    onClick={() => handlePlc(plc.id)} 
                                                >
                                                    {plc.name}
                                                </a>
                                            ))}
                                            <div className="actions-list">
                                                <button className="close-button" onClick={handleNewPlc}>
                                                    <Plus size={18}/>
                                                </button>

                                                <button className="close-button" onClick={handleListPlcsClose}>
                                                    <ChevronUp size={16}/>
                                                </button>
                                            </div>
                                        </List>
                                    )}
                                </>
                            </div>
                        </Menu>
                    </Header>
                    
                ) : (
                    <InsertMenu >
                        <button className="insert-menu-button" onClick={handleInsertMenu}>
                            <PanelLeft size={20} strokeWidth={2.5}/>
                        </button>
                    </InsertMenu>
                )}

                <Content $menuOpen={menuOpen}>
                    {activeView === "devices" && 
                        <AllDevices />
                    }
                    
                    {activeView === "plc" && plcId !== null &&
                        <Plc controllerId={plcId} />
                    }

                    {activeView === "create-plc" && 
                        <FormModal>
                            <CreatePlc onSuccess={() => {
                                setActiveView("devices");
                                setListPlcRefresh(r => r + 1);
                            }}/>
                        </FormModal>
                    }

                    {activeView === "create-device" &&
                        <FormModal>
                            <CreateDevice /> 
                        </FormModal>
                    }

                    {activeView === "device-full" &&
                        <DeviceFull 
                            deviceId={deviceById!}
                        />
                    }
                </Content>
            </Main>
</PageWrapper>
    )
}