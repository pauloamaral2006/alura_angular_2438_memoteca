import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) {}

  listar(
    pagina: number,
    filtro: string,
    favoritos: boolean
  ): Observable<Pensamento[]> {
    const itensPorPagina = 2;
    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', itensPorPagina)
      .set('_start', (pagina - 1) * itensPorPagina);

    if (filtro) {
      if (filtro.trim().length > 2) {
        params = params.set('q', filtro);
      }
    }

    if (favoritos) {
      if (favoritos === true) {
        params = params.set('favorito', true);
      }
    }
    return this.http.get<Pensamento[]>(this.API, { params });
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }
  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    return this.editar(pensamento);
  }
  excluir(id: string): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }

  buscarPorId(id: string): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }
}
