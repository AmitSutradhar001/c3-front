import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import "../../../css/components/apply/applyed/Toggole.css";

const Toggole = ({ isOn, setIsOn, deleteHandel }) => {
  return (
    <Dialog open={isOn} onClose={setIsOn} className="to-outer">
      <DialogBackdrop transition className="to-drop" />

      <div className="to-inn-1">
        <div className="to-inn-2">
          <DialogPanel transition className="to-pan">
            <div className="to-inn-3">
              <div className="to-inn-4">
                <div className="to-inn-5">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="to-exc"
                  />
                </div>
                <div className="to-inn-6">
                  <DialogTitle as="h3" className="to-ti">
                    Delete Project
                  </DialogTitle>
                  <div className="to-inn-7">
                    <p className="to-p">
                      Are you sure you want to
                      <span className="to-span">&quot;Delete&quot;</span> this
                      project? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="to-inn-8">
              <button
                type="button"
                onClick={() => deleteHandel()}
                className="to-btn-1"
              >
                Delete
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setIsOn(false)}
                className="to-btn-2"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
export default Toggole;
