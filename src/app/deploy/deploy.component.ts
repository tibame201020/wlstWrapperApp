import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  ServerConfig,
  DeployConfig,
  ServerJdbc,
  ServerDeploy,
  DatasourceConfig,
} from '../model';
import { WlstService } from '../wlst.service';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css'],
})
export class DeployComponent implements OnInit {
  serverConfig!: ServerConfig;
  deployConfigs: DeployConfig[] = [];

  constructor(private wlstService: WlstService) {}

  ngOnInit(): void {
    this.getLocalData();
  }

  getLocalData() {
    this.wlstService.getServerDeploy().subscribe((res) => {
      this.serverConfig = res.serverConfig;
      this.deployConfigs = res.deployConfigs;
    });
  }

  modify() {
    Swal.fire({
      title: 'Server Config',
      html:
        '<input id="url" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        this.serverConfig.adminURL +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="user" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        this.serverConfig.adminUsername +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="pwd" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        this.serverConfig.adminPassword +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="deployJar" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        this.serverConfig.deployPath +
        '">',
      preConfirm: function () {
        return new Promise(function (resolve) {
          let urlDom = document.getElementById('url') as HTMLInputElement;
          let userDom = document.getElementById('user') as HTMLInputElement;
          let pwdDom = document.getElementById('pwd') as HTMLInputElement;
          let deployJarDom = document.getElementById(
            'deployJar'
          ) as HTMLInputElement;
          if (urlDom && userDom) {
            resolve([
              urlDom.value,
              userDom.value,
              pwdDom.value,
              deployJarDom.value,
            ]);
          }
        });
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          this.changeServerConfig(result.value);
        } else {
          Swal.fire({
            icon: 'error',
            text: '格式錯誤',
          });
        }
      }
    });
  }

  changeServerConfig(value: any) {
    this.serverConfig.adminURL = value[0];
    this.serverConfig.adminUsername = value[1];
    this.serverConfig.adminPassword = value[2];
    this.serverConfig.deployPath = value[3];
  }

  updateDeploy(idx: number) {
    let deployConfig = this.deployConfigs[idx];
    Swal.fire({
      title: 'Deploy Config',
      html:
        '<input id="project" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        deployConfig.project +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="warPath" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        deployConfig.warPath +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="target" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        deployConfig.target +
        '">',
      preConfirm: function () {
        return new Promise(function (resolve) {
          let project = document.getElementById('project') as HTMLInputElement;
          let warPath = document.getElementById('warPath') as HTMLInputElement;
          let target = document.getElementById('target') as HTMLInputElement;
          if (project && warPath && target) {
            resolve([project.value, warPath.value, target.value]);
          }
        });
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          this.deployConfigs[idx] = this.getDeployConfig(result.value);
        } else {
          Swal.fire({
            icon: 'error',
            text: '格式錯誤',
          });
        }
      }
    });
  }

  addDeploy() {
    Swal.fire({
      title: 'Deploy Config',
      html:
        '<input id="project" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        'project' +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="warPath" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        'warPath' +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="target" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        'target' +
        '">',
      preConfirm: function () {
        return new Promise(function (resolve) {
          let project = document.getElementById('project') as HTMLInputElement;
          let warPath = document.getElementById('warPath') as HTMLInputElement;
          let target = document.getElementById('target') as HTMLInputElement;
          if (project && warPath && target) {
            resolve([project.value, warPath.value, target.value]);
          }
        });
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          this.deployConfigs = [this.getDeployConfig(result.value)].concat(
            this.deployConfigs
          );
        } else {
          Swal.fire({
            icon: 'error',
            text: '格式錯誤',
          });
        }
      }
    });
  }

  getDeployConfig(value: any) {
    return {
      project: value[0],
      warPath: value[1],
      target: value[2],
    };
  }

  deleteDeploy(idx: number) {
    this.deployConfigs.splice(idx, 1);
  }
}
