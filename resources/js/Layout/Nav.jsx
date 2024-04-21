import React from 'react'
import 'bootstrap/js/dist/dropdown'
function Nav({Toggle}) {
    return (
        <nav
            class="navbar navbar-expand-sm navbar-white bg-white"
        >
            <i class="navbar-brand bi bi-justify-left" onClick={Toggle} ></i>
            <button
                class="navbar-toggler d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation"
            ></button>
            <div class="collapse navbar-collapse " id="collapsibleNavId">
                <ul class="navbar-nav me-auto mt-2 mt-lg-0">
              
                    <li class="nav-item dropdown ">
                        <a
                            class="nav-link dropdown-toggle "
                            href="#"
                            id="dropdownId"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >username</a>
                        <div class="dropdown-menu" aria-labelledby="dropdownId">
                            <a class="dropdown-item" href="#">profile</a>
                            <a class="dropdown-item" href="#">settings</a>
                            <a class="dropdown-item" href="#">logout</a>

                        </div>
                    </li>
                </ul>
              
            </div>
        </nav>

    )
}

export default Nav