import { type } from '@testing-library/user-event/dist/type';
import { useState } from 'react';
import { serialHandler } from '../SerialHandler';
import { interpreter } from '../Interpreter';

function MeasurePage() {
    const [msg, setMsg] = useState({ text: "", visible: false, type: "alert alert-danger" });
    const [runEnabled, setRunEnabled] = useState("disabled");
    const [connectStyle, setConnectStyle] = useState("btn-primary");
    serialHandler.logger = setMsg;

    async function selectPortClicked() {
        console.log("Select Port Clicked");
        const result = await serialHandler.requestPort();
        if (result) {
            var data = "t\n";
            await serialHandler.write(data);
            const response = await serialHandler.read(1000);
            if (response.search("tespico") !== -1) {
                setRunEnabled("");
                setConnectStyle("btn-success");
            }
        }
    }

    async function runClicked() {
        var data = `e\nvar c\nvar p\nvar t\nset_pgstat_chan 1\nset_pgstat_mode 0\nset_pgstat_chan 0\nset_pgstat_mode 3\nset_max_bandwidth 1333333m\nset_range_minmax da -1600m -1600m\nset_range ba 59n\nset_autoranging ba 59n 59n\nset_e -1200m\ncell_on\nstore_var t 0 eb\nmeas_loop_ca p c -1600m 3m 123m\npck_start\npck_add t\npck_add p\npck_add c\npck_end\nadd_var t 3m\nendloop\non_finished:\ncell_off\n\n`;
        await serialHandler.write(data);
        const response = await serialHandler.read(15000);
        //console.log(response);
        interpreter.interpret(response);
    }

    return (
        <>
            <h5>FaradaIC Sensor Dashboard</h5>
            {
                msg.visible &&
                <div className={msg.type} role="alert" >
                    {msg.text}
                </div>
            }
            {
                'serial' in navigator === false &&
                <div className='alert alert-danger'>
                    Your browser doesn't have permissions to access serial ports.
                </div>
            }
            <div className='row'>
                <div className='col-2'>
                    <button className={'btn w-100 ' + connectStyle}
                        onClick={selectPortClicked}
                    >Select Port</button>
                </div>
                <div className='col-2'>
                    <button className={'btn btn-primary w-100 ' + runEnabled}
                        onClick={runClicked}>
                        Run
                    </button>
                </div>
            </div>


        </>
    );
}

export default MeasurePage;