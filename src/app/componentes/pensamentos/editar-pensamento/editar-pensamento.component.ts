import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-pensamento',
  standalone: false,

  templateUrl: './editar-pensamento.component.html',
  styleUrl: './editar-pensamento.component.css',
})
export class EditarPensamentoComponent {
  pensamento: Pensamento = {
    conteudo: 'Aprendendo Angular',
    autoria: 'Dev',
    modelo: 'modelo1',
  };

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(id!).subscribe((pensamento) => {
      this.pensamento = pensamento;
    });
  }
  editarPensamento() {
    this.service.editar(this.pensamento).subscribe();
    this.router.navigate(['/listarPensamento']);
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }
}
